(function() {
	'use strict';

	/*------------Search Service------------*/
	angular
		.module('nannyfinder')
		.factory('searchService', [
			'$http',
			searchService
		]);

	function searchService($http) {
		// List of possible search services
		var searchService = {
			getAllAds: getAllAds,
			getCaregiverAds: getCaregiverAds,
			getCareseekerAds: getCareseekerAds
		};

		return searchService;

		function getAllAds() {
			return $http({
				method: 'POST',
				url: '/api/getAllAds'
			});
		}

		function getCaregiverAds() {
			return $http({
				method: 'POST',
				url: '/api/getCaregiverAds'
			});
		}

		function getCareseekerAds() {
			return $http({
				method: 'POST',
				url: '/api/getCareseekerAds'
			});
		}
	}
})();