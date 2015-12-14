(function() {
    'use strict';
    
angular.module('jppApp').service('usersService', UsersService);
                                 
function UsersService($http, $state) {
    
    
    this.getUserById = function(userId) {
        var endpoint = '/api/users/' + userId;
        return $http.get(endpoint).then(function (response) {
            return response.data;
        });
    };
    
    
}
    
    
}());
