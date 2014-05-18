// straw-ios-spec.js

/* global describe, before, it, chai, sinon, straw */

describe('straw.core', function () {
    'use strict';

    var expect = chai.expect;

    before(function () {
        // inject dummy location object to prevent an actual page reload.
        straw.core.setLocation({});
    });

    it('is an object', function () {

        expect(straw).not.to.equal(null);
        expect(straw.core).not.to.equal(null);
        expect(straw.core).to.be.a('object');

    });

    describe('serviceCall', function () {

        it('puts a custom url to location.href for the Straw Service call', function () {

            var location = {};

            straw.core.setLocation(location);

            var callId = straw.core.serviceCall('serviceX', 'methodY', {abc: 123});

            expect(location.href).to.equal('straw://' + callId);
        });
    });


    describe('getRequestParams', function () {

        it('returns the request parameters of the corresponding Straw Service call', function () {

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

        it('invokes the success callback', function () {

            // create a mock callback
            var successCallback = sinon.mock();

            // set expectations
            successCallback.once().withArgs({value: 1});

            // create a service call
            var callId = straw.core.serviceCall('serviceX', 'methodY', {}, successCallback);

            // succeed the service call
            straw.core.succeed(callId, {value: 1}, true);

            // verify the expectations
            successCallback.verify();

        });

    });


    describe('fail', function () {

        it('invokes the failure callback', function () {

            // create a mock callback
            var failureCallback = sinon.mock();

            // set expectations
            failureCallback.once().withArgs({code: 1001});

            // create a service call
            var callId = straw.core.serviceCall('serviceX', 'methodY', {}, null, failureCallback);

            // succeed the service call
            straw.core.fail(callId, {code: 1001}, true);

            // verify the expectations
            failureCallback.verify();

        });

    });

});
