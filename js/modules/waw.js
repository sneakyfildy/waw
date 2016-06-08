/* global angular */
requirejs.config({
    basePath: 'js/modules/'
});
define([
    'wawController'
],
function(wawController){    
    angular.module('waw', []).controller('wawController', ['$scope', '$timeout', wawController]);
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['waw']);
    });
});