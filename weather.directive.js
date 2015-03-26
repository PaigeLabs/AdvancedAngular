(function(){
	'use strict';

	var weatherDirective = function(){
		return{
			restrict: 'E',
			scope:{
				location:'=',
				temp:'=currentTemp',
				tempMin:'=low',
				tempMax:'=high',
				conditions: '='
			},
			template: 
			'<section ng-class="current" ng-show="location">'+
				'<h4>{{location}}</h4>'+
				'<div>Current Temp: {{temp | number:0}}</div>'+
				'<div>Lo: {{tempMin | number:0}}</div>'+
				'<div>Hi: {{tempMax | number:0}}</div>'+
				'<div>Current Conditions: {{conditions}}</div>'+
			'</section>'
		};
	};

	angular.module('weatherApp')
		.directive('weather', [weatherDirective]);

}());