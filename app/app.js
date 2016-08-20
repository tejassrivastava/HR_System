(function () {
    'use strict';

    angular
        .module('app', ['ui.router'])

        .service("iUserService", function(UserService , $rootScope) {


            return {
                all: function() {
                    UserService.GetCurrent().then(function (user) {




                        $rootScope.iuser = user.role;
                        $rootScope.iusername = user.firstName;

                        console.log($rootScope.iuser);

                    });
                    return $rootScope.iuser ;

                }
            };
        })
        .config(config)
        .run(run);


    function config($stateProvider, $urlRouterProvider) {


        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider

            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'home' }

            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'account' }
            })
            .state('Payroll', {
                url: '/Payroll',
                templateUrl: 'Payroll/Payroll.html',
                controller: 'Payroll.IndexController',
                controllerAs: 'Payroll',
                data: { activeTab: 'Payroll' },
                resolve: {
                   security: ['$q','$rootScope', function($q,$rootScope){
                       
                        if($rootScope.iuser!="Admin"){
                            return $q.reject("Not Authorized");
                        }
                    }]
                }
                
            })
            .state('Emp', {
                url: '/Employee',
                templateUrl: 'Employee/Employee.html',
                controller: 'Employee.IndexController',
                controllerAs: 'Employee',
                data: { activeTab: 'Employee' },
                resolve: {
                    security: ['$q','$rootScope', function($q,$rootScope){

                        if($rootScope.iuser=="HR"){
                            return $q.reject("Not Authorized");
                        }
                    }]
                }

            });

    }

    function run($http, $rootScope, $window ,iUserService) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

iUserService.all();

        $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error,$window) {

            if (error === "Not Authorized") {
                window.location = "ua.html"
            }       

        });
        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            $rootScope.activeTab = toState.data.activeTab;

        });
    }




    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/app/token', function (token) {
            window.jwtToken = token;

            angular.bootstrap(document, ['app']);
        });
    });
})();