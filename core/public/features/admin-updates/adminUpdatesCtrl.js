angular.module('jppApp')

.controller('adminUpdatesCtrl', ['$scope', 'mainService', '$location', '$stateParams', function ($scope, mainService, $location, $stateParams) {

    $scope.getUserById = function () {
        mainService.getUserById($stateParams.id).then(function (response) {
            $scope.user = response;
        });
    };

    $scope.getUserById();

    $scope.addUser = function () {
        mainService.addUser($scope.newUser).then(function (user) {
            $scope.adminGetUsers();
        });
        $scope.newUser = {};
    };

    $scope.updateUser = function (user) {
        mainService.updateUser(user).then(function (response) {
            $scope.getUserById();
        });
        window.alert("User successfully updated.");
    };

    $scope.showForm = false;

    $scope.showHide = function () {
        $scope.showForm = !$scope.showForm;
    };

    $scope.createShoot = function () {
        mainService.createShoot($scope.newShoot, $stateParams.id).then(function (shoot) {
            $scope.getUserById();
        });
        $scope.newShoot = {};
    };
    
    $scope.deleteShoot = function (shoot) {
        if (window.confirm("Are you sure you want to delete this photoshoot?")) {
            mainService.deleteShoot(shoot).then(function (deletedShoot) {
                $scope.getUserById();
            });
            window.alert("Photoshoot successfully deleted.");
        }
    };
    
    
    $scope.newShoot = {};
    
    $scope.newShoot.photos = [];
    
    $scope.addPhoto = function(photo) {
        $scope.newShoot.photos.push(photo);
        $scope.photo = "";
    };




}]);