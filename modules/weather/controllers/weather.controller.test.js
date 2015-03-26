describe('Weather controller', function(){
	'use strict';

	beforeEach(function(){
		module('weatherApp');
		module(function($provide){
			$provide.value('$routeParams', {cityId:10});
		});
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
		spyOn(weatherService, 'GetHourly').and.callFake(function(cityId){
			return{
				then: function(callback){
					return callback([{ cityId: cityId, dt: 1001	}]);
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

	it('should be able to get the hourly forecast by a specified city id', function(){
		controller.getHourly(10);

		expect(weatherService.GetHourly).toHaveBeenCalledWith(10);
		expect(controller.hourly.length).toEqual(1);
		expect(controller.hourly[0].dt).toEqual(1001);
	});

	it('should be able to clear the form', function(){
		controller.clearForm();
		expect(controller.searchCity).not.toBeDefined();
		expect(controller.weather).not.toBeDefined();
		expect(controller.forecast).not.toBeDefined();
	});

});