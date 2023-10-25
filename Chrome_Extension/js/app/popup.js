console.log('popup.js loaded');
console.log('angular.version');
console.log(angular.version);

let SSearch = angular.module("ssearch", ['ui.router']);

SSearch.config(function($stateProvider, $urlRouterProvider){

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '../views/home.html'
		})
		.state('login', {
			url: '/login',
			templateUrl: '../views/login.html'
		})
		.state('signup', {
			url: '/signup',
			templateUrl: '../views/signup.html'
		})
		.state('welcome', {
			url: '/welcome',
			templateUrl: '../views/welcome.html'
		})
		
	$urlRouterProvider.otherwise('login')
})

// ----- services -----

SSearch.service("DataService", function($http) {
    this.fetchData = function() {
        return $http.get('http://localhost:3000/user/me');
    }
});

// ----- controllers -----

SSearch.controller("PopupCtrl", ['$scope', '$state', 'DataService', function($scope, $state, DataService){
	console.log('PopupCtrl Initialized');

	$scope.init = function() {
		utils.getStorageItem('user', function (userData) {
			const token = userData
			if (token) {
				$state.go('welcome');
			} else {
				$state.go('login')
			}
		})
	}

	$scope.login = function(formData) {
		console.log('formData from Login: ', formData);
		chrome.runtime.sendMessage({type: "login", data: formData},
			function(response){
				console.log('response from the background is: ', response);
				if(response.accessToken) {
					// var decoded = jwt_decode(response.accessToken);
					// $scope.name = response.user.username; 
					// $scope.name = decoded.email;		
					$state.go('welcome');
				} else {
					$scope.errorText = String(response.message);
				}	
			} 
		)
	}

	$scope.signup = function(formData) {
		console.log('formData from Signup: ', formData);
		chrome.runtime.sendMessage({type: "signup", data: formData},
			function(response) {
				console.log('response from the background is: ', response);
				if (response.statusCode === 400) {
					$scope.errorText = String(response.message);
				}
				if (response.statusCode === 409) {
					$scope.errorText = 'Conflict. User with this email alredy exist';
				}
				if (response.statusCode === 201) {
					$state.go('login');
					$scope.errorText = '';
				}

				if(response.token){
					$state.go('login');
				}
			} 
		)
	}

	$scope.logout = function() {
		chrome.storage.sync.get(['user'], function (result) {
			console.log('Value before removal: ', result.user);
			chrome.storage.sync.remove(['user'], function (result) {
				console.log('Result of removal: ', result);
			});
		});

		utils.removeStorageItem('user')
			.then((result) => {
				console.log('Successfully removed "user" storage item', result);
				$state.go('login');
			})
			.catch((error) => {
				console.error('Error removing "user" storage item', error);
			});
	}
}]);

SSearch.controller("WelcomeCtrl", ['$scope', '$state', function($scope, $state){
	console.log('WelcomeCtrl Initialized');

	$scope.initWelcomePage = function() {
		utils.getLSUserId().then(id => {
			chrome.runtime.sendMessage({type: "initWelcomePage", data: { id: id }},
				function(response){
					console.log('response from the background is: ', response);
					if(response?.email) {
						$scope.$apply(function() {
							$scope.name = response.email;
						});
						$scope.name = response.email;
					} else {
						$scope.errorText = String(response.message);
						$scope.name = '123';
					}	
				})
		});
	}
}]);