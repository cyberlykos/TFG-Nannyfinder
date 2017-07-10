(function() {
	'use strict';

	/*------------Ad Manager Service------------*/
	angular
		.module('nannyfinder')
		.factory('adManagerService', [
			'$http',
			adManagerService
		]);

	function adManagerService($http) {
		// List of possible ad manager services
		var adManagerService = {
			createAd: createAd,
			getUserAds: getUserAds,
			getAd: getAd,
			updateAd: updateAd,
			deleteAd: deleteAd
		};

		return adManagerService;

		function createAd(adData, userId) {
			return $http({
				method: 'POST',
				url: '/api/createAd',
				data: adData
			});
		}

		function updateAd(adData) {
			return $http({
				method: 'POST',
				url: '/api/updateAd',
				data: adData
			});
		}

		function deleteAd(id) {
			return $http({
				method: 'POST',
				url: '/api/deleteAd',
				data: {
					adId: id
				}
			});
		}

		function getAd(adId) {
			return $http({
				method: 'POST',
				url: '/api/getAd',
				data: adId
			});
		}

		function getUserAds(userId) {
			console.log(userId); // debug
			return $http({
				method: 'POST',
				url: '/api/getUserAds',
				data: userId
			});
		}
	}
})();