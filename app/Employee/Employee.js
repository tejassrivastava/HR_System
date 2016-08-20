/**
 * Created by tejas on 12-08-2016.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Employee.IndexController', Controller);

    function Controller(UserService) {
        var vm = this;

        vm.user = null;

        initController();

    }

})();
