(function(){
	'use strict';

	var specificDateFilter = function(){
		return function(input, date){
			var specifiedDate = moment.unix(date);
			var nextDay = moment.unix(date).add(1, 'd');

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
