angular.module('jppApp')

.controller('adminCtrl', ['$scope', 'mainService', function ($scope, mainService) {

    $scope.adminGetUsers = function () {
        mainService.adminGetUsers().then(function (users) {
            $scope.users = users;
        });
    };

    $scope.adminGetUsers();
    
    $scope.deleteUser = function (user) {
        if (window.confirm("Are you sure you want to delete user?")) {
            mainService.deleteUser(user).then(function (deletedUser) {
                $scope.adminGetUsers();
            });
            window.alert("User successfully deleted.");
        }
    };



}]);