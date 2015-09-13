/**
 * @ngdoc object
 * @name ngResource decorator
 * @description
 */
angular.module('ngResourceExplorer').config(['$provide', '$resourceProvider', function($provide, $resourceProvider) {
    $provide.decorator('$resource', ['$delegate', '$location', function ($delegate, $location) {
        function getVal(value) {
            if (value === undefined || value.charAt && value.charAt(0) === '@') {
                return null;
            } else {
                return value;
            }
        }

        return function (url, paramDefaults, actions, options) {
            var Resource = $delegate(url, paramDefaults, actions, options);
            Resource.explorer = {
                url: url,
                urlParams: {},
                queryParams: {},
                actions: {},
                options: {}
            }

            // Parse out the url parameters
            angular.forEach(url.split(/\W/), function (param) {
                if (!(new RegExp("^\\d+$").test(param)) && param &&
                    (new RegExp("(^|[^\\\\]):" + param + "(\\W|$)").test(url))) {
                    Resource.explorer.urlParams[param] = null;
                }
            });

            // Store the query parameters and fill out default values
            angular.forEach(paramDefaults, function (value, key) {
                if (key in Resource.explorer.urlParams) {
                    Resource.explorer.urlParams[key] = getVal(value);
                } else {
                    Resource.explorer.queryParams[key] = getVal(value);
                }
            });

            // Merge the custom actions with the default actions
            Resource.explorer.actions = angular.extend({}, $resourceProvider.defaults.actions, actions);

            // Merge the options with default options, and don't duplicate the actions data
            Resource.explorer.options = angular.extend({}, $resourceProvider.defaults, options);
            delete Resource.explorer.options.actions;

            return Resource;
        }
    }]);
}]);
