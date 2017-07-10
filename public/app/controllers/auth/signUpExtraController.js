(function() {
	'use strict';

	/*------------Sign Up Extra Form Controller------------*/
	angular
		.module('nannyfinder')
		.controller('SignUpExtraController', [
			'$state',
			'localStorageService',
			'signUpMetaService',
			'authService',
			signUpExtraController
		]);

	// Validation and handle of registration process
	function signUpExtraController($state, localStorageService, signUpMetaService, authService) {
		var vm = this;

		// Error flag and message
		vm.signUpError = false;
		vm.signUpErrorMessage = null;

		// Selected options by default
		vm.experience = "No experience";
		vm.smoker = "false";
		vm.driveLicense = "false";

		vm.submitForm = function(isValid) {
			if (isValid) {

				var email = signUpMetaService.getEmail();

				// Extra data needed for a caregiver user
				var extraUserData = {
					experience: vm.experience,
					firstAid: vm.firstAid,
					monitor: vm.monitor,
					eduTitle: vm.eduTitle,
					smoker: (vm.smoker === "true"),
					driveLicense: (vm.driveLicense === "true"),
					email: email
				};

				authService.signUpExtra(extraUserData)
					.then(handleSuccessfullSignUp)
					.catch(handleFailedSignUp)
			}

			function handleSuccessfullSignUp(response) {
				$state.go('signin');
				localStorageService.clearAll();
			}

			function handleFailedSignUp(response) {
				if (res && res.data) {
					vm.signInError = true;
					vm.signInErrorMessage = res.data.message;
				}
			}
		}
	}
})();