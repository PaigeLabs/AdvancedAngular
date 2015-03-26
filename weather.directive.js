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
				'<div>Current Temp: {{weather.temp | number:0}}</div>'+
				'<div>Lo: {{weather.tempMin | number:0}}</div>'+
				'<div>Hi: {{weather.tempMax | number:0}}</div>'+
				'<div>Current Conditions: {{weather.conditions}}</div>'+
			'</section>'
		};
	};

	angular.module('weatherApp')
		.directive('weather', [weatherDirective]);

}());