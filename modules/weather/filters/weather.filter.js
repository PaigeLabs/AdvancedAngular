(function(){
	'use strict';

	var specificDateFilter = function(){
		return function(input, date){
			var specifiedDate = moment.unix(date/1000);
			var nextDay = moment.unix(date/1000).add(1, 'd');
			
			if(input && input.length > 0){
				return input.filter(function(item){
					return item.dt >= specifiedDate.unix() && item.dt <= nextDay.unix();
				});
			}else{
				return input;
			}
		};
	};

	angular.module('weatherApp')
		.filter('specificDate', [specificDateFilter]);

}());