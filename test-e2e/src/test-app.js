angular.module('ngResourceExplorerTest', ['ngResourceExplorer']);

// angular.module('ngResourceExplorerTest').config(['$httpProvider', function ($httpProvider) {
//     // alternatively, register the interceptor via an anonymous factory
//     $httpProvider.interceptors.push([function () {
//         return {
//             'request': function (config) {
//                 console.log(config);
//                 return config;
//             }
//         };
//     }]);
// }]);
//
angular.module('ngResourceExplorerTest').controller('ngResourceExplorerTestCtrl', [
    '$resource',
    function ($resource) {
        var vm = this;
        var Channels = $resource('https://api.twitch.tv/kraken/channels/:channel/videos', {
            limit: 10,
            offset: 0,
            broadcasts: false,
            hsl: false
        }, {
            get: {
                method: 'JSONP',
                headers: {
                    'Accept': 'application/vnd.twitchtv.v3+json'
                },
                params: {
                    callback: 'JSON_CALLBACK'
                }
            }
        });
        vm.resource = Channels;

        function genUrl(config) {
            console.log('con', config);
            angular.forEach(config.url.split(/\W/), function (param) {
                if (!(new RegExp('^\\d+$').test(param)) && param &&
                        (new RegExp('(^|[^\\\\]):' + param + '(\\W|$)').test(config.url))) {
                    config.url = config.url.replace(':' + param, config.params[param]);
                }
            });
            return config.url;
        }

        function genHeaders(config) {
            angular.forEach(config.headers, function (header, headerKey) {
                angular.forEach(config.params, function (paramVal, param) {
                    console.log(header, paramVal, param);
                    if (header.indexOf(':' + param) > -1) {
                        config.headers[headerKey] = header.replace(':' + param, paramVal);
                        console.log('in', config.headers);
                    }
                });
            });
            config.headers.bonus = 'Bonus';
            return config.headers;
        };

        function genApi(config) {
            return function (params, data) {
                var result = angular.merge({}, config);
                result.params = angular.merge({}, result.params, params);
                result.data = angular.merge({}, result.data, data);
                result.url = genUrl(result);
                result.headers = genHeaders(result);
                return result;
            }
        }

        var getChannelVideos = genApi({
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
        });

        var getChannelVideos2 = {
            method: 'JSONP',
            url: 'https://api.twitch.tv/kraken/channels/:channel/videos',
            headers: {
                'Accept': 'application/vnd.twitchtv.v3+json'
            },
            params: {
                limit: 10,
                offset: 0,
                broadcasts: false,
                hsl: false,
                callback: 'JSON_CALLBACK'
            }
        };

        vm.http = getChannelVideos;
    }
]);
