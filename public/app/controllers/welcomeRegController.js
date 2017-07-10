(function() {
	'use strict';

	/*------------Welcome Registration Controller------------*/
	angular
		.module('nannyfinder')
		.controller('WelcomeRegController', [
			'$state',
			'signUpMetaService',
			welcomeRegController
		]);

	function welcomeRegController($state, signUpMetaService) {
		var vm = this;

		vm.setRegType = function(id) {
			signUpMetaService.setRegType(id);
			$state.go('signup');
		}
	}
})();