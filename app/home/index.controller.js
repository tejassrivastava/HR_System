(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller);

    function Controller(UserService) {
        var vm = this;

        vm.user = null;

        initController();

        function initController($window) {
            // get current user
            UserService.GetCurrent().then(function (user ,res) {
                vm.user = user;
                
            });

        }
    }

})();