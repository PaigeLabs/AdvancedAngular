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
							conditions: result.data.weather[0].main,
							image: result.data.weather[0].icon
						};
				});
		};

		var getForecast = function(city){
			return $http.get('http://api.openweathermap.org/data/2.5/forecast/daily?q='+city+'&mode=json&units=imperial&cnt=5')
				.then(function(result){
					return result.data.list.map(function(val,key){
						return {
							cityId: result.data.city.id,
							date: val.dt * 1000,
							tempMin: val.temp.min,
							tempMax: val.temp.max,
							conditions: val.weather[0].main,
							image: val.weather[0].icon
						};
					});
				});
		};

		var getHourly = function(cityId){
      return $http.get('http://api.openweathermap.org/data/2.5/forecast?id=' + cityId + '&units=imperial')
      	.then(function(result){
      		return {
						location: result.data.city.name,
						list: result.data.list
					};
      	});
    };

		return {
			GetCurrent: getCurrent,
			GetForecast: getForecast,
			GetHourly: getHourly
		};
	};

	angular.module('weatherApp')
		.factory('WeatherService', ['$http', weatherService]);

}());
