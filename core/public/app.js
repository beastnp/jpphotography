var app = angular.module('jppApp', ['ui.router', 'ngCookies']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'features/home/homeTmpl.html',
            controller: 'homeCtrl'
        })
        .state('portfolio-pricing', {
            url: '/portfolio-pricing',
            templateUrl: 'features/portfolio/portfolioTmpl.html',
            controller: 'portfolioCtrl'
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'features/contact/contactTmpl.html',
            controller: 'contactCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'features/login/loginTmpl.html',
            controller: 'loginCtrl'
        })
        .state('users', {
            url: '/users/:id',
            templateUrl: 'features/users/usersTmpl.html',
            controller: 'usersCtrl'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'features/admin/adminTmpl.html',
            controller: 'adminCtrl'
        })
        .state('admin-updates', {
            url: '/admin/:id',
            templateUrl: 'features/admin-updates/adminUpdatesTmpl.html',
            controller: 'adminUpdatesCtrl'
        });

    $urlRouterProvider
        .otherwise('/');

});

//app.run(function ($state, $rootScope, $cookies) {
//    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
//        if (toState.name === 'users') {
//            console.log($cookies.get('connectSid'));
//        }
//    });
//});