(function() {
    'use strict';

    angular
        .module('nannyfinder')
        .controller('SearchController', [
            'searchService',
            'NgMap',
            searchController
        ]);

    function searchController(searchService, NgMap) {
        var vm = this;

        vm.searchType = 0;
        vm.ads = [];

        vm.searchError = false;
        vm.searchErrorMessage = null;

        // Init 
        searchService.getAllAds().then(fillAds);


        vm.switchSearchType = function() {
            var val = vm.searchType;

            try {
                switch (val) {
                    case 0:
                        searchService.getAllAds().then(fillAds);
                        break;
                    case 1:
                        searchService.getCaregiverAds().then(fillAds);
                        break;
                    case 2:
                        searchService.getCareseekerAds().then(fillAds);
                        break;
                }
            } catch (e) {
                console.log(e);
            }
        };

        function fillAds(response) {
            var ads = response.data.adsData;

            for (var i = 0; i < ads.length; i++) {
                ads[i].User.address = JSON.parse(ads[i].User.address);
            }
            vm.ads = ads;
        }
    }

})();