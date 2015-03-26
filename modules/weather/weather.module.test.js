describe('Weather App Module', function(){
	'use strict';

	beforeEach(module('weatherApp'));

	describe('routing', function(){

		it('should display the main template for the root route', inject(function($route){
			expect($route.routes['/'].templateUrl).toBe('modules/weather/views/main.view.html');
		}));

		it('should display the hourly view for the \'hourly\' route', inject(function($route){
			expect($route.routes['/hourly/:cityId/:date'].templateUrl).toBe('modules/weather/views/hourly.view.html');
		}));

	});

});