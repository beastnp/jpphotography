angular.module('jppApp')

.factory('shootsService', function ($http) {
    
    var service = {};
    
    service.storeImage = function (imageData, fileName) {
        var imageExtension = imageData.split(';')[0].split('/');
        imageExtension = imageExtension[imageExtension.length - 1];

        var newImage = {
            imageName: fileName,
            imageBody: imageData,
            imageExtension: imageExtension
//            userEmail: ''
        }

        return $http.post('/api/newimage', newImage)
    }
    
    return service;

});