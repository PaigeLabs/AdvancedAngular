(function(){
	'use strict';

	var config = function($routeProvider){
		$routeProvider
			.when('/', {
				templateUrl: 'main.view.html'
			})
			.when('/hourly/:cityId/:date', {
				templateUrl:'hourly.view.html'
			})
			.otherwise({redirectTo:'/'});
	};

	angular.module('weatherApp', ['ngRoute'])
		.config(['$routeProvider', config]);

}());