(function(){
	'use strict';

	var config = function($routeProvider, $httpProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'modules/weather/views/main.view.html'
			})
			.when('/hourly/:cityId/:date', {
				templateUrl:'modules/weather/views/hourly.view.html'
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