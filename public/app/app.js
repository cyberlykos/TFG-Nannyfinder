(function() {

    'use strict';

    /*------------Main------------*/
    var nannyfinder = angular.module('nannyfinder', [
        'ui.router',
        'ngCookies',
        'ngMessages',
        'ngAnimate',
        'ngFileUpload',
        'google.places',
        'ngMap'
    ]);


    // API Request Interceptor
    nannyfinder.factory('requestInterceptor', [
        '$cookies',
        function($cookies) {
            return {
                request: function(config) {
                    var user = $cookies.get('user'),
                        token = null;

                    if (user) {
                        user = JSON.parse(user);
                        token = user.token ? user.token : null;
                    }

                    if (token) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = token;
                    }

                    return config;
                }
            };
        }
    ]);

    var staticData = {};

    var userRoles = staticData.userRoles = {
        guest: 1,
        user: 2,
        admin: 4
    };

    staticData.accessLevels = {
        guest: userRoles.guest | userRoles.user | userRoles.admin,
        user: userRoles.user | userRoles.admin,
        admin: userRoles.admin
    };

    nannyfinder.constant('staticData', staticData);

    // Config block
    nannyfinder.config([
        '$stateProvider',
        '$urlRouterProvider',
        '$httpProvider',
        '$locationProvider',
        'staticData',
        authConfig
    ]);

    function authConfig(
        $stateProvider,
        $urlRouterProvider,
        $httpProvider,
        $locationProvider,
        staticData) {


        /*------------UI Routes------------*/


        // Redirect to 404 when route not found
        $urlRouterProvider.otherwise(function($injector, $location) {
            $injector.get('$state').transitionTo('not-found', null, {
                location: false
            });
        });


        // Index
        $stateProvider.state('index', {
            url: '/',
            templateUrl: 'app/views/partials/partial-index.html',
        });
        // Login
        $stateProvider.state('signin', {
            url: '/signin',
            templateUrl: 'app/views/partials/auth/partial-auth-signIn.html',
            controller: 'SignInController as sgnInc'
        });
        // Register area
        $stateProvider.state('signup', {
            url: '/signup',
            templateUrl: 'app/views/partials/auth/partial-auth-signUp-common.html',
            controller: 'SignUpCommonController as sgnUpcc'
        });
        $stateProvider.state('signup-extra', {
            url: '/signup-extra',
            templateUrl: 'app/views/partials/auth/partial-auth-signUp-extra.html',
            controller: 'SignUpExtraController as sgnUpexc',
        });
        // User area route.
        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'app/views/partials/dashboard/partial-profile.html',
            controller: 'ProfileController as pc',
            data: {
                accessLevel: staticData.accessLevels.user
            }
        });
        // Admin area route.
        $stateProvider.state('admin', {
            url: '/admin',
            templateUrl: 'app/views/partials/dashboard/partial-admin.html',
            controller: 'AdminController as ac',
            data: {
                accessLevel: staticData.accessLevels.admin
            }
        });
        // User Ads list
        $stateProvider.state('adsList', {
            url: '/ads',
            templateUrl: 'app/views/partials/dashboard/ads/partial-dashboard-ads-list.html',
            controller: 'AdsListController as alc',
            data: {
                accessLevel: staticData.accessLevels.user
            }
        });
        // Create ad route.
        $stateProvider.state('createAd', {
            url: '/new-ad',
            templateUrl: 'app/views/partials/dashboard/ads/partial-dashboard-ad-create.html',
            controller: 'CreateAdController as cac',
            data: {
                accessLevel: staticData.accessLevels.user
            }
        });
        // Modify ad route.
        $stateProvider.state('modifyAd', {
            url: '/modify-ad',
            templateUrl: 'app/views/partials/dashboard/ads/partial-dashboard-ad-modify.html',
            controller: 'ModifyAdController as mac',
            data: {
                accessLevel: staticData.accessLevels.user
            }
        });
        // Search route
        $stateProvider.state('search', {
            url: '/search',
            templateUrl: 'app/views/partials/search/partial-search.html',
            controller: 'SearchController as shc',
            data: {
                accessLevel: staticData.accessLevels.user
            }
        });
        // Other routes
        $stateProvider.state('not-found', {
            url: '/not-found',
            templateUrl: 'app/views/404-view.html'
        });
        $stateProvider.state('bad-request', {
            url: '/bad-request',
            templateUrl: 'app/views/400-view.html'
        });
        $stateProvider.state('forbidden', {
            url: '/forbidden',
            templateUrl: 'app/views/403-view.html'
        });

        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('requestInterceptor');
    }

    // Run block.
    nannyfinder.run([
        '$rootScope',
        '$state',
        'authService',
        authRun
    ]);

    // State interceptor based on user access levels
    function authRun($rootScope, $state, authService) {
        $rootScope.$on('$stateChangeStart', function(event, toState) {
            if (toState.data && toState.data.accessLevel) {
                var user = authService.getUserData();
                if (!(toState.data.accessLevel & user.role)) {
                    event.preventDefault();
                    $state.go('forbidden');
                    return;
                }
            }
        });
    }
})();