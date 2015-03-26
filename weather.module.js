(function(){
	'use strict';

	var config = function($routeProvider, $httpProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'main.view.html'
			})
			.when('/hourly/:cityId/:date', {
				templateUrl:'hourly.view.html'
			})
			.otherwise({redirectTo:'/'});

			$httpProvider.interceptors.push('httpInterceptor');

	};

	var run = function($rootScope){
		//$rootScope.$broadcast('loader_hide');
	};

	angular.module('weatherApp', ['ngRoute'])
		.config(['$routeProvider', '$httpProvider', config])
		.run(['$rootScope', run]);

}());