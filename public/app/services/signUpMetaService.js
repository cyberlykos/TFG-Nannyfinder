(function() {
	'use strict';

	/*------------Sign Up Metadata Setvice------------*/
	angular
		.module('nannyfinder')
		.factory('signUpMetaService', [
			'$state',
			'localStorageService',
			signUpMetaService
		]);

	// Validation and handle of registration process
	function signUpMetaService($state, localStorageService) {

		var signUpMetaService = {
			setRegType: setRegType,
			setUsrData: setUsrData,
			getRegType: getRegType,
			getEmail: getEmail
		};

		return signUpMetaService;

		function setRegType(id) {
			var signUpMeta = {
				regType: id // 0: start, 1: caregiver, 2: careseeker
			};
			localStorageService.save("signUpMeta", signUpMeta);
		}

		function getRegType() {
			return JSON.parse(localStorageService.get('signUpMeta')).regType;
		}

		function getEmail() {
			return JSON.parse(localStorageService.get('signUpMeta')).email;
		}

		function setUsrData(email) {
			var signUpMeta = JSON.parse(localStorageService.get("signUpMeta"));
			var signUpMeta = {
				email: email
			};
			localStorageService.save("signUpMeta", signUpMeta);
		}
	}
})();