(function(){
	'use strict';
	
	var weatherService = function($http){
		var getCurrent = function(city){
			return $http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial')
				.then(function(result){
					return {
							location: result.data.name,
							temp: result.data.main.temp,
							tempMin: result.data.main.temp_min,
							tempMax: result.data.main.temp_max,
							conditions: result.data.weather[0].main
						};
				});	
		};

		var getForecast = function(city){
			return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&mode=json&units=imperial&cnt=5')
				.then(function(result){
					return result.data.list.map(function(val,key){
						return {
							tempMin: val.temp.min,
							tempMax: val.temp.max,
							conditions: val.weather[0].main
						};
					});
				});
		};

		return {
			GetCurrent: getCurrent,
			GetForecast: getForecast
		};
	};

	angular.module('weatherApp')
		.factory('WeatherService', ['$http', weatherService]);

}());