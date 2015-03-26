describe('Weather controller', function(){
	'use strict';

	beforeEach(function(){
		module('weatherApp');
	});

	var controller, weatherService;
	beforeEach(inject(function($controller, WeatherService){
		weatherService = WeatherService;
		spyOn(weatherService, 'GetCurrent').and.callFake(function(city){
			return {
				then: function(callback){
					return callback({ location: city	});
				}
			};
		});
		spyOn(weatherService, 'GetForecast').and.callFake(function(city){
			return{
				then: function(callback){
					return callback([{ cityId: 1	}]);
				}
			};
		});
		controller = $controller('MainCtrl');
	}));

	it('should be defined', function(){
		expect(controller).toBeDefined();
	});

	it('should be able to get current weather for a specified city and the forecast for that city', function(){
		var testCity = 'Liberty,MO';
		controller.getCurrent(testCity);

		expect(weatherService.GetCurrent).toHaveBeenCalledWith(testCity);
		expect(weatherService.GetForecast).toHaveBeenCalledWith(testCity);
		expect(controller.weather.location).toEqual(testCity);
		expect(controller.forecast.length).toEqual(1);
		expect(controller.forecast[0].cityId).toEqual(1);
		
	});

});