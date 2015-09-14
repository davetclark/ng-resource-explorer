angular.module('ngResourceExplorerTest', ['ngResourceExplorer']);

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
    }
]);
