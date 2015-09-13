describe('ngResource decorator', function() {
    var $resource,
        defaultActions;
    beforeEach(function() {
        module('ngResourceExplorer');
        module(function($resourceProvider) {
            defaultActions = $resourceProvider.defaults.actions;
        });
        inject(function(_$resource_) {
            $resource = _$resource_;
        });
    });
    describe('decorations', function() {
        var Resource,
            url = 'http://test/me/:id1/:id2.:id3';
        beforeEach(function() {
            Resource = $resource(url, {
                id2: 'id2val',
                extra1: 'extra1val',
                extra2: undefined
            }, {
                get: {
                    method: 'NOTGET',
                    headers: {
                        'header1': 'header1val'
                    }
                },
                customAction: {
                    method: 'TEST'
                }
            }, {
                customOption: true
            });
        });
        it('should have explorer decoration', function() {
            expect(Resource.explorer).toEqual(jasmine.any(Object));
        });
        it('should have correct url', function() {
            expect(Resource.explorer.url).toEqual(url);
        });
        it('should handle default parameter values', function() {
            expect(Resource.explorer.urlParams).toEqual(jasmine.objectContaining({
                id1: null,
                id2: 'id2val',
                id3: null
            }));
            expect(Resource.explorer.queryParams).toEqual(jasmine.objectContaining({
                extra1: 'extra1val',
                extra2: null
            }));
        });
        it('should contain all default actions', function() {
            for (var key in defaultActions) {
                defaultActions[key] = jasmine.any(Object)
            }
            expect(Resource.explorer.actions).toEqual(jasmine.objectContaining(defaultActions));
        });
        it('should have overwritten default action data', function() {
            expect(Resource.explorer.actions.get).toEqual(jasmine.objectContaining({
                method: 'NOTGET',
                headers: {
                    'header1': 'header1val'
                }
            }));
        });
        it('should have custom action default action data', function() {
            expect(Resource.explorer.actions.customAction).toEqual(jasmine.objectContaining({
                method: 'TEST'
            }));
        });
        it('should have options', function() {
            expect(Resource.explorer.options).toEqual(jasmine.objectContaining({
                stripTrailingSlashes: true,
                customOption: true
            }));
        });
    });
});
