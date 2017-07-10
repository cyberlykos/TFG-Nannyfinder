(function() {
	'use strict';

	/*------------Filters used in scope------------*/

	angular
		.module('nannyfinder')
		.filter('booleanFilter', function() {
			return function(bool) {
				return bool ? 'Yes' : 'No';
			};
		});
})();