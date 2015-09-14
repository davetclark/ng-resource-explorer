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
            vm.actionData = ex.actions[vm.action];

            vm.urlParams = angular.extend({}, ex.urlParams);
            vm.queryParams = angular.extend({}, ex.queryParams);
            vm.combined = function () {
                return angular.extend({}, vm.urlParams, vm.queryParams);
            }

            vm.go = function () {
                var params = angular.extend({}, vm.urlParams, vm.queryParams);
                $scope.resource[vm.action](params).$promise.then(function (resource) {
                    vm.response = resource.$explorer;
                }, function (response) {
                    vm.response = response;
                });
            };

            vm.click = function () {
                console.log('click')
            }

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
