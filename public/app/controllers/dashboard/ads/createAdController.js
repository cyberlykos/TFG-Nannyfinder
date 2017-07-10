(function() {
	'use strict';

	/*------------Create Ad Controller------------*/
	angular
		.module('nannyfinder')
		.controller('CreateAdController', [
			'$scope',
			'$state',
			'localStorageService',
			'adManagerService',
			createAdController
		]);

	function createAdController($scope, $state, localStorageService, adManagerService) {
		var vm = this;

		// Service type flag:
		vm.serviceType = JSON.parse(localStorageService.get("serviceType")).id;

		// Error flag
		vm.createAdError = false;
		vm.createAdErrorMessage = null;


		vm.submitForm = function(isValid) {
			if (isValid) {

				var userId = JSON.parse(localStorageService.get("userId")).id;

				var newAd = {
					title: vm.title,
					description: vm.description,
					tariffs: vm.tariffs || "",
					cooking: vm.cooking || false,
					schoolwork: vm.schoolwork || false,
					housework: vm.housework || false,
					music: vm.music || false,
					UserId: userId,
					serviceType: vm.serviceType
				};


				adManagerService.createAd(newAd)
					.then(handleSuccessfullOperation)
					.catch(handleFailedOperation);
			}
		};

		function handleSuccessfullOperation() {
			$scope.createAdForm.$setPristine();
			$state.go('adsList');
		}

		function handleFailedOperation(res) {
			if (res && res.data) {
				vm.createAdError = true;
				vm.createAdErrorMessage = res.data.message;
			}
		}
	}
})();