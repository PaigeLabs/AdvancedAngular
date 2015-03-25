(function(){

	var weatherController = function($scope, $http, WeatherService){

		$scope.getCurrent = function(){
			$scope.weather = null;
			$scope.forecast = null;
			WeatherService.GetCurrent($scope.searchCity)
				.then(function(result){
					$scope.weather = result;
					$scope.getForecast();
				});
		};

		$scope.getForecast = function(){
			WeatherService.GetForecast($scope.searchCity)
				.then(function(result){
					$scope.forecast = result;
				});
		};
	};

	

	angular.module('weatherApp', [])
		.controller('MainCtrl', ['$scope', '$http', 'WeatherService', weatherController]);

}());