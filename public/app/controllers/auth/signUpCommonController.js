(function() {
	'use strict';

	/*------------Sign Up Common Form Controller------------*/
	angular
		.module('nannyfinder')
		.controller('SignUpCommonController', [
			'$scope',
			'$state',
			'signUpMetaService',
			'authService',
			signUpCommonController
		]);

	// Validation and handle of registration process
	function signUpCommonController($scope, $state, signUpMetaService, authService) {
		var vm = this;

		// Error messages and error flag
		vm.signUpSuccess = false;
		vm.signUpError = false;
		vm.signUpErrorMessage = null;


		// Address request options
		vm.autoCompleteOptions = {
			types: ['address']
		};

		vm.submitForm = function(isValid) {
			// Error messages and error flag
			vm.signUpSuccess = false;
			vm.signUpError = false;
			vm.signUpErrorMessage = null;

			if (isValid) {
				// Address object
				var address = {
					formattedAddress: vm.address.formatted_address,
					viewport: vm.address.geometry.viewport
				};

				// New user object
				var newUserData = {
					email: vm.email.trim(),
					password: vm.password.trim(),
					firstName: vm.firstName.trim(),
					lastName: vm.lastName.trim(),
					phoneNumber: vm.phoneNumber.trim(),
					address: JSON.stringify(address)
				};

				authService.signUpCommon(newUserData)
					.then(handleSuccessfullSignUp(newUserData.email))
					.catch(handleFailedSignUp);

			}

			function handleSuccessfullSignUp(email) {
				vm.signUpSuccess = true;
				vm.signInError = false;

				if (signUpMetaService.getRegType() == 1) {
					signUpMetaService.setUsrData(email);
					$state.go('signup-extra');
				}
				clearForm();
			}

			function handleFailedSignUp(res) {
				vm.signUpSuccess = false;
				if (res && res.data) {
					vm.signInError = true;
					vm.signInErrorMessage = res.data.message;
				}
			}

			function clearForm() {
				vm.email = vm.password = vm.passwordR = vm.firstName = vm.lastName = vm.phoneNumber = vm.address = null;
				$scope.signUpCommonForm.$setPristine();
			}
		};
	}
})();