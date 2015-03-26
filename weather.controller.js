(function(){
	'use strict';
	
	var weatherController = function($scope, $http, $routeParams, WeatherService){

		$scope.getCurrent = function(searchCity){
			$scope.weather = null;
			$scope.forecast = null;
			WeatherService.GetCurrent(searchCity)
				.then(function(result){
					$scope.weather = result;
					$scope.getForecast(searchCity);
				});
		};

		$scope.getForecast = function(searchCity){
			WeatherService.GetForecast(searchCity)
				.then(function(result){
					$scope.forecast = result;
				});
		};

		$scope.getHourly = function(){
			$scope.date = $routeParams.date;
			WeatherService.GetHourly($routeParams.cityId)
				.then(function(result){
					$scope.hourly = result;
				});
		};

		$scope.clearForm = function(){
			$scope.weather = null;
			$scope.forecast = null;
		};
	};

	

	angular.module('weatherApp')
		.controller('MainCtrl', ['$scope', '$http', '$routeParams', 'WeatherService', weatherController]);

}());