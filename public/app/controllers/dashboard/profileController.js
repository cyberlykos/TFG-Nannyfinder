(function() {
    'use strict';

    /*------------User area Controller------------*/
    angular
        .module('nannyfinder')
        .controller('ProfileController', [
            '$scope',
            '$timeout',
            '$window',
            'Upload',
            'localStorageService',
            'profileService',
            'authService',
            profileController
        ]);

    function profileController($scope, $timeout, $window, Upload, localStorageService, profileService, authService) {
        var vm = this;


        // Modify flag
        vm.modify = false;
        vm.profileError = false;
        vm.profileMessage = null;

        // User id
        var userId;
        // Populate the profile with the user data
        var userData;

        // Fetch user data
        fetchUserData();

        vm.submitForm = function(isValid) {
            if (isValid) {

                var address = {
                    formattedAddress: vm.address.formatted_address,
                    viewport: vm.address.geometry.viewport
                };

                var updatedUser = {
                    id: vm.id,
                    firstName: vm.firstName,
                    lastName: vm.lastName,
                    phoneNumber: vm.phoneNumber,
                    address: JSON.stringify(address),
                    experience: vm.experience,
                    monitor: vm.monitor,
                    firstAid: vm.firstAid,
                    eduTitle: vm.eduTitle,
                    driveLicense: vm.driveLicense,
                    smoker: vm.smoker,
                    email: vm.email,
                    password: vm.password
                };

                profileService.updateUserData(updatedUser)
                    .then(handleSuccessfullOperation)
                    .catch(handleFailedOperation);
            }
        };

        function fetchUserData() {
            profileService.getUserData()
                .then(function(response) {
                    userData = response.data.userData;

                    $timeout(fillForm(userData), 2600);

                    localStorageService.save("userId", {
                        id: userData.id
                    });
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        function fillForm(userData) {
            vm.id = userData.id;
            vm.welcome = vm.firstName = userData.firstName;
            vm.lastName = userData.lastName;
            vm.phoneNumber = userData.phoneNumber;
            vm.address = JSON.parse(userData.address);
            vm.experience = userData.experience;
            vm.monitor = userData.monitor;
            vm.firstAid = userData.firstAid;
            vm.eduTitle = userData.eduTitle;
            vm.driveLicense = userData.driveLicense;
            vm.smoker = userData.smoker;
            vm.photo = userData.photo;
            vm.email = userData.email;
            vm.password = userData.password;
        }

        vm.delConfirm = function() {
            var deleteUser = $window.confirm('Are you sure you want to delete your user account? (This action cannot be undone)');

            if (deleteUser) {
                profileService.deleteUser(vm.id).then(function(response) {
                    authService.signOut();
                });
            }
        }

        function handleSuccessfullOperation() {
            vm.modify = false;
            vm.profileSuccess = true;
            $scope.updateProfileForm.$setPristine();
            fetchUserData();
        }

        function handleFailedOperation(res) {
            vm.profileSuccess = false;
            if (res && res.data) {
                vm.profileError = true;
                vm.profileMessage = res.data.message;
            }
        }

        // Upload profile pic error flags
        vm.uploadError = false;
        vm.uploadSuccess = false;

        // Upload profile pic (doesn't work)
        vm.upload = function(file) {
            var fName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 1);

            Upload.upload({
                method: 'POST',
                url: '/api/uploadProfilePic',
                contentType: '',
                file: {
                    file: file
                }
            }).then(function(resp) {
                vm.uploadError = false;
                vm.uploadSuccess = true;
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function(resp) {
                vm.uploadError = true;
                vm.uploadSuccess = false;
                console.log('Error status: ' + resp.status);
            });
        };
    }
})();