(function() {
	'use strict';

	/*------------Ad Manager List Controller------------*/
	angular
		.module('nannyfinder')
		.controller('AdsListController', [
			'$window',
			'$state',
			'localStorageService',
			'adManagerService',
			adListController
		]);

	function adListController($window, $state, localStorageService, adManagerService) {
		var vm = this;

		// Array of user ads
		vm.ads = [];

		// Error flag
		vm.adsListError = false;
		vm.adsListErrorMessage = null;

		// Fetch all ads
		fetchAdsList();

		vm.setServiceType = function(id) {
			localStorageService.save('serviceType', {
				id: id
			});
			$state.go('createAd');
		};

		vm.modifyAd = function(id) {
			localStorageService.save('adId', {
				adId: id
			});
			$state.go('modifyAd')
		}

		vm.delConfirm = function(id) {
			var deleteAd = $window.confirm('Are you sure you want to delete this ad?');

			if (deleteAd) {
				adManagerService.deleteAd(id).then(function(response) {
					fetchAdsList();

					vm.adsListInfo = true;
					vm.adsListInfoMessage = response.data.message;

				});
			}
		}

		function fetchAdsList() {
			adManagerService.getUserAds(localStorageService.get('userId'))
				.then(handleSuccessfullOperation)
				.catch(handleFailedOperation);
		}

		function handleSuccessfullOperation(response) {
			vm.adsListError = false;
			vm.ads = response.data.adList;
		}

		function handleFailedOperation(response) {
			vm.adsListError = true;
			vm.adsListErrorMessage = "There was an error retrieving your ads.";
		}
	}
})();