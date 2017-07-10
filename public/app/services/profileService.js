(function() {
	'use strict';

	/*------------Profile Service------------*/
	angular
		.module('nannyfinder')
		.factory('profileService', [
			'$http',
			profileService
		]);

	function profileService($http) {
		// List of possible profile services
		var profileService = {
			getUserData: getUserData,
			updateUserData: updateUserData,
			deleteUser: deleteUser
		};

		return profileService;

		function getUserData() {
			return $http({
				method: 'POST',
				url: '/api/getUserData'
			});
		}

		function updateUserData(userData) {
			return $http({
				method: 'POST',
				url: '/api/updateUserData',
				data: userData
			});
		}

		function deleteUser(id) {
			return $http({
				method: 'POST',
				url: '/api/deleteUser',
				data: {
					userId: id
				}
			});
		}
	}
})();