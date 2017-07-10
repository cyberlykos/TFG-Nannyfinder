(function() {
	'use strict';

	/*------------Sign In Controller------------*/
	angular
		.module('nannyfinder')
		.controller('SignInController', [
			'$state',
			'authService',
			signInController
		]);

	// Validation and handle of login form
	function signInController($state, authService) {
		var vm = this;

		// Error messages and error flag
		vm.signInError = false
		vm.signInrrorMessage = null;

		// Function that throws login validation
		vm.signIn = signIn;

		function signIn() {
			vm.signInError = false
			vm.signInErrorMessage = null;

			if (!vm.email || !vm.password) {
				vm.signInError = true;
				vm.signInErrorMessage = 'Email and password are required!';
				return;
			}

			authService.signIn(vm.email, vm.password)
				.then(handleSuccessfullSignIn)
				.catch(handleFailedSignIn);
		}

		function handleSuccessfullSignIn() {
			$state.go('profile');
		}

		function handleFailedSignIn(res) {
			if (res && res.data) {
				vm.signInError = true;
				vm.signInErrorMessage = res.data.message;
			}
		}
	}
})();