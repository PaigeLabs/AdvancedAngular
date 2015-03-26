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
				conditions: '=',
				image: '='
			},
			template: 
			'<section ng-class="current" ng-show="location">'+
				'<h4>{{location}} <img ng-src="http://openweathermap.org/img/w/{{image}}.png"/></h4>'+
				'<div>Current Temp: {{temp | number:0}}</div>'+
				'<div>Lo: {{tempMin | number:0}}</div>'+
				'<div>Hi: {{tempMax | number:0}}</div>'+
				'<div>Current Conditions: {{conditions}}</div>'+
			'</section>'
		};
	};

	var loaderDirective = function(){
		return{
			restrict: 'E',
			transclude: true,
			template: '<div ng-show="showEl" ng-transclude></div>',
			link: function(scope, element, attrs){
				scope.$on('loader_show', function(){
					scope.showEl = true;
				});
				scope.$on('loader_hide', function(){
					scope.showEl = false;
				});
			}
		};
	};

	angular.module('weatherApp')
		.directive('currentWeather', [weatherDirective])
		.directive('loader', [loaderDirective]);

}());