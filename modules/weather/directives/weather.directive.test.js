describe('Current Weather Directive', function(){
	'use strict';

	var $compile, $rootScope, element;
	var fakeWeather = {
		location: 'Liberty,MO',
		temp: 50,
		tempMax: 55,
		tempMin: 45,
		conditions: 'cloudy',
		image: '04d'
	};

	beforeEach(module('weatherApp'));

	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	beforeEach(function(){
		$rootScope.weather = fakeWeather;
		var ngElement = angular.element('<current-weather '+
			'location="weather.location"'+
			'current-temp="weather.temp"'+
			'high="weather.tempMax"'+
			'low="weather.tempMin"'+
			'conditions="weather.conditions"'+
			'image="weather.image"'+
			'></current-weather>');
		element = $compile(ngElement)($rootScope);
		$rootScope.$digest();
	});

	it('displays the location', function(){
		expect(element.find('h4').html()).toContain(fakeWeather.location);
	});

	it('displays the current temperature', function(){
		var el = element[0].querySelector('.current-temp');
		expect(angular.element(el).html()).toContain(fakeWeather.temp);
	});

	it('displays the high temperature', function(){
		var el = element[0].querySelector('.high-temp');
		expect(angular.element(el).html()).toContain(fakeWeather.tempMax);
	});

	it('displays the low temperature', function(){
		var el = element[0].querySelector('.low-temp');
		expect(angular.element(el).html()).toContain(fakeWeather.tempMin);
	});

	it('displays the current conditions', function(){
		var el = element[0].querySelector('.current-conditions');
		expect(angular.element(el).html()).toContain(fakeWeather.conditions);

	});

	it('displays the condition image', function(){
		expect(element.find('img').attr('src')).toContain(fakeWeather.image);
	});




});