/**
 * @ngdoc module
 * @name ngResourceExplorer
 * @description
 * # ngResourceExplorer
 */

angular.module('ngResourceExplorer', ['ngResource', 'ngMaterial'])
    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('pink')
            .accentPalette('orange');
    }]);
