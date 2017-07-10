(function() {
	'use strict';

	/*------------Validation directives------------*/
	angular
		.module('nannyfinder')
		// Strings comparison
		.directive('compareTo', function() {
			return {
				restrict: 'A',
				scope: {
					otherValue: "=compareTo"
				},
				require: 'ngModel',
				link: function(scope, elem, attrs, ngModel) {
					ngModel.$validators.compareTo = function(value) {
						return value === scope.otherValue;
					};

					scope.$watch("otherValue", function() {
						ngModel.$validate();
					});
				}
			};
		});

	angular
		.module('nannyfinder')
		// Phone validator (International)
		.directive('phoneValidator', function() {
			return {
				require: 'ngModel',
				link: function(scope, elem, attrs, ngModel) {
					var regex = /^((\\+)|(00)|(\\*)|())[0-9]{3,14}((\\#)|())$/;
					var validator = function(value) {
						ngModel.$setValidity('phoneValidator', regex.test(value));
						return value;
					};

					ngModel.$parsers.unshift(validator);
					ngModel.$formatters.unshift(validator);
				}
			};
		});

	angular
		.module('nannyfinder')
		// Simple password validator
		.directive('passwordValidator', function() {
			return {
				require: 'ngModel',
				link: function(scope, elem, attrs, ngModel) {
					var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
					var validator = function(value) {
						ngModel.$setValidity('passwordValidator', regex.test(value));
						return value;
					}

					ngModel.$parsers.unshift(validator);
					ngModel.$formatters.unshift(validator);
				}
			};
		});
})();