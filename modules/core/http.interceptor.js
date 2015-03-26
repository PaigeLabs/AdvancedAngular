(function(){
	'use strict';

	var httpInterceptor = function($q, $rootScope){
		var numLoadings = 0;

		return{
			request: function(config){
				numLoadings++;
				$rootScope.$broadcast('loader_show');
				return config || $q.when(config);
			},
			response: function(response){
				if((--numLoadings) === 0){
					$rootScope.$broadcast('loader_hide');
				}
				return response || $q.when(response);
			},
			responseError: function(response){
				if (!(--numLoadings)) {
          $rootScope.$broadcast('loader_hide');
        }

        return $q.reject(response);
			}
		};
	};

	angular.module('weatherApp')
		.factory('httpInterceptor', ['$q', '$rootScope', httpInterceptor]);
		
}());