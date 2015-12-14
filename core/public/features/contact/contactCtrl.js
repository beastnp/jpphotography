angular.module('jppApp')

.controller('contactCtrl', function ($scope, $http, keysService) {

     $scope.email = {
        username: "",
        userEmail: "",
        emailSubject: "",
        emailCompose: ""
    };

    $scope.submit = function () {
        var emailData = {
            key: keysService.mandrillKey,
            message: {
                from_email: $scope.email.userEmail,
                to: [
                    {
                        email: 'jordan_peterson09@icloud.com',
                        type: 'to'
                    }
                ],
                subject: $scope.email.emailSubject,
                html: $scope.email.emailCompose
            }
        };


        var request = {
            method: "POST",
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: emailData
        };
        console.log(request);
        $http(request)
            .success(function successCallBack(response) {
                console.log(response);
                $scope.email = "";
            });

    };

});