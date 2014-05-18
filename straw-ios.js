// straw-ios.js

/**
 * @class straw
 * `straw` is the root object of Straw Framework.
 *
 * @singleton
 */
var straw = {
    /**
     * @property {String} version
     * The version number
     */
    version: 'v0.1.0'
};

straw.core = (function () {
    'use strict';

    var currentId = Math.floor(Math.random() * 10000000);

    var genId = function () {
        return (currentId++).toString();
    };

    /**
     * @class CallbackPair
     *
     * CallbackPair class represents the pair of success callback and failure callback.
     *
     * @private
     */
    var CallbackPair = function (id, successCallback, failureCallback) {

        if (!successCallback && !failureCallback) {
            return null;
        }

        this.id = id;
        this.successCallback = successCallback;
        this.failureCallback = failureCallback;

    };

    var callbackPairPt = CallbackPair.prototype;

    /**
     * @method
     * Call the appropriate callback function according to the given success flag.
     *
     * @param {Boolean} isSuccess the callback result is success or not
     * @param {Object} params the parameters
     * @return {void}
     */
    callbackPairPt.call = function (isSuccess, params) {

        if (isSuccess) {

            if (this.successCallbck === 'function') {
                this.successCallback.call(null, params);
            }

        } else {

            if (this.failureCallbck === 'function') {
                this.failureCallback.call(null, params);
            }

        }
    };


    /**
     * @class StrawCore
     * StrawCore class provides core bridging functionality of Straw Framework.
     *
     * @private
     */
    var StrawCore = function () {

        /**
         * @property
         * table of callbacks
         */
        this.cbTable = {};

        /**
         * @property
         * table of Service call parameters
         */
        this.pTable = {};

        /**
         * @property
         * local copy of window.location
         */
        this.location = window.location;

    };

    var strawCorePt = StrawCore.prototype;

    /**
     * @method
     * Execute Straw Service Call through native bridging mechanism.
     *
     * @param {String} service the service name
     * @param {String} method the method name
     * @param {Object} params the parameters
     * @param {Function} successCallback the callback for success
     * @param {Function} failureCallback the callback for failure
     * @return {String} the id of the created Straw Service Call
     */
    strawCorePt.exec = function (service, method, params, successCallback, failureCallback) {

        var id = genId();

        var callback = new CallbackPair(id, successCallback, failureCallback);

        this.storeCallback(callback);

        var requestParams = {callId: id, service: service, method: method, params: params};

        this.storeParams(requestParams);

        this.invokeNativeBridge(id);

        return id;
    };


    /**
     * @method
     * Invoke native bridge.
     *
     * @param {String} id the id to call
     * @return {void}
     */
    strawCorePt.invokeNativeBridge = function (id) {
        this.location.href = this.generateStrawCallUrl(id);
    };


    /**
     * @method
     * Generate a custom url for Straw Service Call.
     *
     * @param {String} id the id of the call
     * @return {String} the custom scheme url for Straw Service Call
     */
    strawCorePt.generateStrawCallUrl = function (id) {
        return 'straw://' + id;
    };


    /**
     * @method
     * Store the callback to the callback table
     *
     * @param {CallbackPair} callback the callback to store
     * @return {void}
     */
    strawCorePt.storeCallback = function (callback) {

        if (callback == null || callback.id == null) {
            return;
        }

        this.cbTable[callback.id] = callback;
    };


    /**
     * @method
     * Retrieve callback object from the callback table.
     *
     * @param {String} id callback id
     * @param {Boolean} keepAlive keep callback or not
     * @return {CallbackPair} retrieved callback or undefined if not found
     */
    strawCorePt.retrieveCallback = function (id, keepAlive) {
        var callback = this.cbTable[id];

        if (callback == null) {
            // this case is not irregular because some services don't require callbacks (for example hud-service)
            return;
        }

        if (!keepAlive) {
            delete this.cbTable[id];
        }

        return callback;
    };


    /**
     * @method
     * Store Straw Request parameters.
     *
     * @param {Object} params the parameters to store
     * @return {void}
     */
    strawCorePt.storeParams = function (params) {

        if (params == null || params.callId == null) {
            return;
        }

        this.pTable[params.callId] = params;

    };


    /**
     * @method
     * Retrieve the parameters for the Straw Request.
     *
     * @param {String} id the id of Straw Request
     * @return {Object} the parameter of the Straw Request
     */
    strawCorePt.retrieveParams = function (id) {
        var params = this.pTable[id];

        if (!params) {
            window.console.log('[Warn] param for id=' + id + ' not found');

            return;
        }

        delete this.pTable[id];

        return params;
    };


    /**
     * @method
     * Perform callback invocation.
     *
     * This method handles the result of Native Service Method process and invoke the appropriate callback.
     *
     * @param {String} id the id
     * @param {Boolean} isSuccess is success or not
     * @param {Object} params parameters for Service callback
     * @param {Boolean} keepAlive keep callback or not
     * @return {void}
     */
    strawCorePt.nativeCallback = function (id, isSuccess, params, keepAlive) {

        var callback = this.retrieveCallback(id, keepAlive);

        if (callback != null) {

            callback.call(params);
        }

    };

    var strawCore = new StrawCore();


    /**
     * @class straw.core
     * `straw.core` is the core API for Straw Service call functionality.
     *
     * Straw Service developers should use `serviceCall` method of this class to create native Service Call request.
     *
     * @singleton
     */
    var StrawApi = function () {};

    var strawApiPt = StrawApi.prototype;

    /**
     * @method
     * Get service call's request parameters.
     *
     * @param {String} callId the call id
     * @return {Object} the request parameter
     */
    strawApiPt.getRequestParams = function (callId) {
        return strawCore.retrieveParams(callId);
    };


    /**
     * @method
     * Call a Straw Service.
     *
     * @param {String} service the service name
     * @param {String} method the method name
     * @param {Object} params the parameter
     * @param {Function} successCallback the success callback
     * @param {Function} failureCallback the failure callback
     * @return {String} the id of the created Service call
     */
    strawApiPt.serviceCall = function (service, method, params, successCallback, failureCallback) {
        return strawCore.exec(service, method, params, successCallback, failureCallback);
    };


    /**
     * @method
     * Succeed service call.
     *
     * @param {String} callId the Service call id
     * @param {Object} params the parameter object which contains code and message fields
     * @param {Boolean} keepAlive if true then keep the callback, otherwise drop it
     * @return {void}
     */
    strawApiPt.succeed = function (callId, params, keepAlive) {
        strawCore.nativeCallback(callId, true, params, keepAlive);
    };


    /**
     * @method
     * Fail service call.
     *
     * @param {String} callId the Service call id
     * @param {Object} params the parameter object which contains code and message fields
     * @param {Boolean} keepAlive if true then keep the callback, otherwise drop it
     * @return {void}
     */
    strawApiPt.fail = function (callId, params, keepAlive) {
        strawCore.nativeCallback(callId, false, params, keepAlive);
    };


    /**
     * @method
     * Set location object in (private) StrawCore object
     *
     * This method is only for test.
     *
     * @param {Location} location object
     */
    strawApiPt.setLocation = function (location) {
        strawCore.location = location;
    };


    var exports = new StrawApi();

    return exports;

}());


/**
 * @class
 * `straw.service` is the namespace for services of Straw Framework.
 *
 * Straw Service developers should put their JS interface under this namespace. For example, `straw.service.http`, `straw.service.hud` or `straw.service.locale`.
 *
 * @singleton
 */
straw.service = {};
