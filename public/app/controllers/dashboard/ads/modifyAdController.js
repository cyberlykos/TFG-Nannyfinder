(function() {
	'use strict';

	/*------------Modify Ad Controller------------*/
	angular
		.module('nannyfinder')
		.controller('ModifyAdController', [
			'$state',
			'localStorageService',
			'adManagerService',
			modifyAdController
		]);

	function modifyAdController($state, localStorageService, adManagerService) {
		var vm = this;

		// Populate form with ad data
		var adId = localStorageService.get('adId');
		console.log(adId) // debug

		var adData;

		adManagerService.getAd(adId)
			.then(function(response) {
				adData = response.data.adData;

				vm.title = adData.title;
				vm.description = adData.description;
				vm.tariffs = adData.tariffs;
				vm.cooking = adData.cooking;
				vm.schoolwork = adData.schoolwork;
				vm.housework = adData.housework;
				vm.music = adData.music;
			})
			.catch(function(error) {
				console.log(error);
			});

		// Error flag
		vm.modifyAdError = false;
		vm.modifyErrorMessage = null;
		vm.modifyAdSuccess = false;


		vm.submitForm = function(isValid) {
			if (isValid) {

				var updatedAd = {
					title: vm.title,
					description: vm.description,
					tariffs: vm.tariffs || "",
					cooking: vm.cooking,
					schoolwork: vm.schoolwork,
					housework: vm.housework,
					music: vm.music,
					adId: JSON.parse(adId).adId,
				};

				adManagerService.updateAd(updatedAd)
					.then(handleSuccessfullOperation)
					.catch(handleFailedOperation);
			}
		};

		function handleSuccessfullOperation() {
			vm.modifyAdSuccess = true;
		}

		function handleFailedOperation(res) {
			if (res && res.data) {
				vm.modifyAdError = true;
				vm.modifyAdErrorMessage = res.data.message;
			}
		}
	}
})();