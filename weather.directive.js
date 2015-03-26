(function(){
	'use strict';

	var weatherDirective = function(){
		return{
			restrict: 'E',
			scope:{
				weather: '='
			},
			template: 
			'<section ng-class="current" ng-show="weather">'+
				'<h4>{{weather.location}}</h4>'+
				'<div>Current Temp: {{weather.temp}}</div>'+
				'<div>Lo: {{weather.tempMin}}</div>'+
				'<div>Hi: {{weather.tempMax}}</div>'+
				'<div>Current Conditions: {{weather.conditions}}</div>'+
			'</section>'
		};
	};

	angular.module('weatherApp')
		.directive('weather', [weatherDirective]);

}());