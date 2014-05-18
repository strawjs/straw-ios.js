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

        it('does nothing without error if callback is not registered', function () {

            // create a service call
            var callId = straw.core.serviceCall('serviceX', 'methodY', {});

            // succeed the service call
            straw.core.succeed(callId, {value: 1}, true);

        });

        it('does nothing without error if callback is not a function', function () {

            // create a service call
            var callId = straw.core.serviceCall('serviceX', 'methodY', {}, 'bogus callback');

            // succeed the service call
            straw.core.succeed(callId, {value: 1}, true);

        });

        describe('with keepAlive', function () {

            it('keeps the callback and can invoke the same callback multiple times', function () {

                // create a mock callback
                var successCallback = sinon.mock();

                // set expectations
                successCallback.thrice();

                // create a service call
                var callId = straw.core.serviceCall('serviceX', 'methodY', {}, successCallback);

                // succeed the service call
                straw.core.succeed(callId, {value: 3}, true);
                straw.core.succeed(callId, {value: 5}, true);
                straw.core.succeed(callId, {value: 8}, true);

                // verify the expectations
                successCallback.verify();

            });

        });

        describe('without keepAlive', function () {

            it('drops the callback and cannot invoke the same callback twice', function () {

                // create a mock callback
                var successCallback = sinon.mock();

                // set expectations
                successCallback.once();

                // create a service call
                var callId = straw.core.serviceCall('serviceX', 'methodY', {}, successCallback);

                // succeed the service call with keepAlive false
                straw.core.succeed(callId, {value: 3}, false);

                // succeed the same call id but these should be meaningless
                straw.core.succeed(callId, {value: 5}, true);
                straw.core.succeed(callId, {value: 8}, false);

                // verify the expectations
                successCallback.verify();

            });
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

        it('does nothing without error if callback is not a function', function () {

            // create a service call
            var callId = straw.core.serviceCall('serviceX', 'methodY', {}, null, 'bogus callback');

            // fail the service call
            straw.core.fail(callId, {value: 1}, true);

        });

    });

});
