(function() {
	'use strict';

	/*------------Local Storage Service------------*/
	angular
		.module('nannyfinder')
		.factory('localStorageService', [
			'$rootScope',
			localStorageService
		]);

	function localStorageService($rootScope) {
		// List of possible local storage services
		var localStorageService = {
			get: get,
			save: save,
			remove: remove,
			clearAll: clearAll
		};

		return localStorageService;

		function get(key) {
			return localStorage.getItem(key);
		}

		function save(key, data) {
			localStorage.setItem(key, JSON.stringify(data));
		}

		function remove(key) {
			localStorage.removeItem(key);
		}

		function clearAll() {
			localStorage.clear();
		}
	}
})();