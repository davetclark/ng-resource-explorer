// /**
//  * @ngdoc directive
//  * @name resourceExplorer
//  * @description
//  */
// angular.module('ngResourceExplorer').directive('resourceExplorer', [function () {
//     return {
//         restrict: 'E',
//         scope: {
//             resource: '=',
//             action: '@'
//         },
//         templateUrl: 't.html',
//         controller: ['$scope', function ($scope) {
//             var vm = this,
//                 ex = $scope.resource.explorer;
//
//             vm.url = ex.url;
//             vm.action = $scope.action;
//             vm.actionData = ex.actions[vm.action];
//
//             vm.urlParams = angular.extend({}, ex.urlParams);
//             vm.queryParams = angular.extend({}, ex.queryParams);
//             vm.combined = function () {
//                 return angular.extend({}, vm.urlParams, vm.queryParams);
//             }
//
//             vm.go = function () {
//                 var params = angular.extend({}, vm.urlParams, vm.queryParams);
//                 $scope.resource[vm.action](params).$promise.then(function (resource) {
//                     vm.response = resource.$explorer;
//                 }, function (response) {
//                     vm.response = response;
//                 });
//             };
//
//             vm.click = function () {
//                 console.log('click')
//             }
//
//             //
//             // $scope.getMethod = function (action) {
//             //     console.log(action, ex.actions)
//             //     return ex.actions[action].method;
//             // }
//         }],
//         controllerAs: 'vm',
//         link: function (scope, iElem, iAttrs) {
//             // iElem.
//         }
//     };
// }]);
//

angular.module('ngResourceExplorer').directive('jsonModel', [function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            console.log('woo')
            ngModel.$parsers.push(function (text) {
                if (!text || text.trim() === '') {
                    return {};
                }
                var object = {};
                try {
                    object = angular.fromJson(text);
                    ngModel.$setValidity('invalidJson', true);
                } catch (e) {
                    ngModel.$setValidity('invalidJson', false);
                }
                return object;
            });
            ngModel.$formatters.push(function (object) {
                return angular.toJson(object, true);
            });
        }
    };
}]);

/**
 * @ngdoc directive
 * @name resourceExplorer
 * @description
 */
angular.module('ngResourceExplorer').directive('httpExplorer', [function () {
    return {
        restrict: 'E',
        scope: {
            config: '='
        },
        templateUrl: 't0.html',
        controller: ['$scope', '$http', function ($scope, $http) {
            var vm = this;

            var Test = function (params, data) {
                function genUrl() {
                    var url = self.url;
                    angular.forEach(url.split(/\W/), function (param) {
                        if (!(new RegExp('^\\d+$').test(param)) && param &&
                                (new RegExp('(^|[^\\\\]):' + param + '(\\W|$)').test(url))) {
                            url = url.replace(':' + param, self.params[param]);
                        }
                    });
                    return url;
                }

                function genHeaders() {
                    var headers = angular.merge({}, self.headers);
                    angular.forEach(headers, function (header, headerKey) {
                        angular.forEach(self.params, function (paramVal, param) {
                            if (header.indexOf(':' + param) > -1) {
                                headers[headerKey] = header.replace(':' + param, paramVal);
                            }
                        });
                    });
                    headers.bonus = 'Bonus';
                    return headers;
                }

                this.params = angular.merge({}, this.params, params);
                this.data = angular.merge({}, this.data, data);
                this.url = genUrl()
                this.headers = genHeaders()
            };

            Test.prototype = {
                method: 'JSONP',
                url: 'https://api.twitch.tv/kraken/channels/:channel/videos',
                headers: {
                    'Accept': 'application/vnd.twitchtv.v3+json',
                    'Authorization': 'Basic :testHeaderData'
                },
                params: {
                    testHeaderData: 'wow',
                    channel: 'nvidia',
                    limit: 10,
                    offset: 0,
                    broadcasts: false,
                    hsl: false,
                    callback: 'JSON_CALLBACK'
                }
            };

            console.log(new Test);
            console.log(Test.prototype);

            vm.origConfig = $scope.config();
            vm.method = vm.origConfig.method.toLowerCase() === 'jsonp' ? 'get' : vm.origConfig.method;

            function refreshRequest() {
                // var reversedInterceptors = [];
                // angular.forEach($httpProvider.interceptors, function (interceptor) {
                //     reversedInterceptors.unshift(angular.isString(interceptor)
                //         ? $injector.get(interceptor) : $injector.invoke(interceptor));
                // });
                // $delegate.interceptors = reversedInterceptors;
                console.log($http.interceptors);
            };
            refreshRequest();

            vm.test = {
                testdata: 1,
                test2: 'woo'
            };

            // var vm = this,
            //     ex = $scope.resource.explorer;
            //
            // vm.url = ex.url;
            // vm.action = $scope.action;
            // vm.actionData = ex.actions[vm.action];
            //
            // vm.urlParams = angular.extend({}, ex.urlParams);
            // vm.queryParams = angular.extend({}, ex.queryParams);
            // vm.combined = function () {
            //     return angular.extend({}, vm.urlParams, vm.queryParams);
            // }
            //
            // vm.go = function () {
            //     var params = angular.extend({}, vm.urlParams, vm.queryParams);
            //     $scope.resource[vm.action](params).$promise.then(function (resource) {
            //         vm.response = resource.$explorer;
            //     }, function (response) {
            //         vm.response = response;
            //     });
            // };
            //
            // vm.click = function () {
            //     console.log('click')
            // }

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
