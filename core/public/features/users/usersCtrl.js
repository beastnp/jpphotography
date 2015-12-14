angular.module('jppApp')

.controller('usersCtrl', function ($scope, $stateParams, usersService) {

    usersService.getUserById($stateParams.id).then(function (response) {
        $scope.user = response;
    });
    
    $scope.showPhotos = function(shoot) {
        shoot.display = !shoot.display;
    };


});