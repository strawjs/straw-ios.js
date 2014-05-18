// straw-ios-spec.js

/* global describe, it, chai, straw */

describe('straw.core', function () {
    'use strict';

    var expect = chai.expect;

    it('exists', function () {

        expect(straw).not.to.equal(null);
        expect(straw.core).not.to.equal(null);

    });

    describe('serviceCall', function () {
    });


    describe('getRequestParams', function () {

        it('returns the request parameters of corresponding Straw Service call', function () {

            straw.core.setLocation({});

            var callId = straw.core.serviceCall('srv_x', 'meth_y', {abc: 123});

            var params = straw.core.getRequestParams(callId);

            expect(params).to.deep.equal({
                service: 'srv_x',
                method: 'meth_y',
                params: {abc: 123},
                callId: callId
            });

        });

    });


    describe('succeed', function () {
    });


    describe('fail', function () {
    });

});
