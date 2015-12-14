angular.module('jppApp')

.service('mainService', function ($http, $state) {

    this.adminGetUsers = function () {
        return $http.get('/api/users').then(function (users) {
            return users.data;
        });
    };

    this.getUserById = function(userId) {
        var endpoint = '/api/users/' + userId;
        return $http.get(endpoint).then(function (response) {
            return response.data;
        });
    };

    this.addUser = function (user) {
        return $http.post('/api/users', user).then(function (newUser) {
            return newUser;
        });
    };

    this.updateUser = function (user) {
        var endpoint = '/api/users/' + user._id;
        return $http.put(endpoint, user).then(function (response) {
            return response.data;
        });
    };

    this.deleteUser = function (user) {
        var endpoint = '/api/users/' + user._id;
        return $http.delete(endpoint);
    };

//    this.createShootInfo = function (obj) {
//        return $http({
//            method: 'POST',
//            url: '/api/shoots',
//            data: obj
//        }).then(function (response) {
//            if (response.status != 200) {
//                return "Error!";
//            }
//            return response.data;
//        });
//    };
    
    this.createShoot = function (shoot, userId) {
        return $http.post('/api/shoots/', shoot).then(function (newShoot) {
            return $http.post('/api/users/add-shoot/' + userId, newShoot.data).then(function(result) {
//                console.log(result);
            })
        });
    };
    
    this.deleteShoot = function (shoot) {
        var endpoint = '/api/shoots/' + shoot._id;
        return $http.delete(endpoint);
    };

});