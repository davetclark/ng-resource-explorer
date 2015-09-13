/**
 * @ngdoc directive
 * @name resourceExplorer
 * @description
 */
angular.module('ngResourceExplorer').directive('resourceExplorer', [function () {
    return {
        restrict: 'E',
        scope: {
            resource: '=',
            action: '@'
        },
        templateUrl: 't.html',
        controller: ['$scope', function ($scope) {
            var vm = this,
                ex = $scope.resource.explorer;

            vm.url = ex.url;
            vm.action = $scope.action;
            vm.method = ex.actions[vm.action].method;

            vm.urlParams = angular.extend({}, ex.urlParams);
            vm.queryParams = angular.extend({}, ex.queryParams);

            vm.response = {};

            vm.go = function () {
                var params = angular.extend({}, vm.urlParams, vm.queryParams);
                console.log(params);
                $scope.resource[vm.action](params).$promise.then(function (resource) {
                    vm.response.data = resource;
                }, function (response) {
                    vm.response = angular.extend(vm.response, response);
                    console.log(response);
                    console.log(response.headers());
                });
            };

            //
            // $scope.getMethod = function (action) {
            //     console.log(action, ex.actions)
            //     return ex.actions[action].method;
            // }
        }],
        controllerAs: 'vm',
        link: function (scope, iElem, iAttrs) {
            // iElem.
        }
    };
}]);
