(function() {
    'use strict';

    /*------------Navigation controller------------*/
    angular
        .module('nannyfinder')
        .controller('NavController', [
            'authService',
            navController
        ]);

    function navController(authService) {
        var vm = this;

        vm.isAuthenticated = authService.isAuthenticated;
        vm.signOut = authService.signOut;
    }

})();