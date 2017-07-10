(function() {
	'use strict';

	/*------------Authentication Service------------*/
	angular
		.module('nannyfinder')
		.factory('authService', [
			'$http',
			'$cookies',
			'$state',
			'localStorageService',
			authService
		]);

	function authService($http, $cookies, $state, localStorageService) {
		// List of possible auth services
		var authService = {
			signIn: signIn,
			signOut: signOut,
			getUserData: getUserData,
			isAuthenticated: isAuthenticated,
			signUpCommon: signUpCommon,
			signUpExtra: signUpExtra
		};

		return authService;

		function signIn(email, password) {
			var reqObj = {
				method: 'POST',
				url: '/api/signIn',
				data: {
					email: email,
					password: password
				}
			};

			return $http(reqObj).then(function(res) {
				if (res && res.data) {
					res = res.data;

					var expires = new Date(),
						user = {};

					user.email = res.email;
					user.role = res.role;
					user.token = res.token;

					expires.setTime(expires.getTime() + (30 * 60 * 1000));

					$cookies.put(
						'user',
						JSON.stringify(user, {
							expires: expires
						})
					);
				}
			});
		}

		function signOut() {
			localStorageService.clearAll();
			$cookies.remove('user');
			$state.go('index');
		}

		function isAuthenticated() {
			var user = $cookies.get('user');
			return user && user !== 'undefined';
		}

		function getUserData() {
			if (isAuthenticated()) {
				return JSON.parse($cookies.get('user'));
			}
			return false;
		}

		function signUpCommon(newUserData) {
			var reqObj = {
				method: 'POST',
				url: '/api/signUp',
				data: newUserData
			};

			return $http(reqObj);
		}

		function signUpExtra(extraUserData) {
			var reqObj = {
				method: 'POST',
				url: '/api/signUpExtra',
				data: extraUserData
			};

			return $http(reqObj);
		}
	}
})();