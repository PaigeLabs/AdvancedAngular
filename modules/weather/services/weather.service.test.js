describe('Weather Service', function(){
	'use strict';

	var fakeWeather = {
	    "name": "Liberty",
	    "weather": [
	      {
	        "id": 803,
	        "main": "Clouds",
	        "icon": "04d"
	      }
	    ],
	    "main": {
	      "temp": 55,
	      "temp_min": 50,
	      "temp_max": 60
	    }
	  };

	var fakeForecast = {
		city:{
				id: 1,
				name: 'Liberty'
		},
		list: [{
			dt: 1001,
			temp: {
				min: 20,
				max: 30
			},
			weather: [{
				main: 'sunny',
				icon: '04d'
			}]
		}]
	};

	var fakeHourly = {
		city:{
			name:'Liberty'
		},
		list:[{
			dt: 1001,
			temp:{
				min: 20,
				max: 30
			},
			weather:[{
				description: 'sunny'
			}]
		}]
	};

	var $httpBackend, weatherService;

	beforeEach(module('weatherApp'));

	beforeEach(inject(function($injector){
		$httpBackend = $injector.get('$httpBackend');
		weatherService = $injector.get('WeatherService');
		$httpBackend.when('GET','http://api.openweathermap.org/data/2.5/weather?q=Liberty,MO&units=imperial').respond(fakeWeather);
		$httpBackend.whenGET('http://api.openweathermap.org/data/2.5/forecast/daily?q=Liberty,MO&mode=json&units=imperial&cnt=5').respond(fakeForecast);
		$httpBackend.whenGET('http://api.openweathermap.org/data/2.5/forecast?id=1&units=imperial').respond(fakeHourly);
	}));

	it('should be able to get the current weather for a city', function(){
		weatherService.GetCurrent('Liberty,MO').then(function(result){
			expect(result.location).toBe('Liberty');
			expect(result.tempMin).toEqual(50);
			expect(result.tempMax).toEqual(60);
			expect(result.temp).toEqual(55);
		});
		$httpBackend.flush();
	});

	it('should be able to get the forecast for a given city', function(){
		weatherService.GetForecast('Liberty,MO').then(function(result){
			expect(result[0].cityId).toEqual(1);
			expect(result[0].tempMin).toEqual(20);
			expect(result[0].tempMax).toEqual(30);
		});
		$httpBackend.flush();
	});

	it('should be able to get an hourly forecast for a specified city', function(){
		weatherService.GetHourly(1).then(function(result){
			expect(result.list[0].dt).toEqual(1001);
			expect(result.list[0].temp.min).toEqual(20);
			expect(result.list[0].temp.max).toEqual(30);
			expect(result.list[0].weather[0].description).toEqual('sunny');
		});
		$httpBackend.flush();
	});

});