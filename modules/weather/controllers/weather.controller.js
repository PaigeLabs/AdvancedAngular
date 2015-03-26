(function(){
	'use strict';
	
	var weatherController = function($routeParams, WeatherService){

		var ctrl = this;

		ctrl.getCurrent = function(searchCity){
			ctrl.weather = null;
			ctrl.forecast = null;
			WeatherService.GetCurrent(searchCity)
				.then(function(result){
					ctrl.weather = result;
					ctrl.getForecast(searchCity);
				});
		};

		ctrl.getForecast = function(searchCity){
			WeatherService.GetForecast(searchCity)
				.then(function(result){
					ctrl.forecast = result;
				});
		};

		ctrl.getHourly = function(){
			ctrl.date = $routeParams.date;
			WeatherService.GetHourly($routeParams.cityId)
				.then(function(result){
					ctrl.hourly = result;
				});
		};

		ctrl.clearForm = function(){
			delete ctrl.searchCity;
			delete ctrl.weather;
			delete ctrl.forecast;
			delete ctrl.hourly;
		};

		return ctrl;

	};

	

	angular.module('weatherApp')
		.controller('MainCtrl', ['$routeParams', 'WeatherService', weatherController]);

}());