// straw-ios.js

/**
 * @class straw
 * `straw` is the root object of Straw Framework.
 *
 * @singleton
 */
this.straw = {
    /**
     * @property {String} version
     * The version number
     */
    version: 'v0.0.0'
};

straw.core = (function () {
    'use strict';

    var currentId = Math.floor(Math.random() * 10000000);

    var genId = function () {
        return (currentId++).toString();
    };

    /**
     * @class CallbackPair
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
     */
    var StrawCore = function () {

        // table of callbacks
        this.cbTable = {};

        // table of Service call parameters
        this.paramsTable = {};

    };

    var strawCorePt = StrawCore.prototype;

    /**
     * @method
     */
    strawCorePt.exec = function (service, method, params, successCallback, failureCallback) {

        var id = genId();

        var callback = new CallbackPair(id, successCallback, failureCallback);

        this.storeCallback(callback);

        var requestParams = {callId: id, service: service, method: method, params: params};

        this.storeParams(requestParams);

        this.invokeNativeBridge(id);
    };

    /**
     * @method
     */
    strawCorePt.invokeNativeBridge = function (id) {
        location.href = this.generateStrawCallUrl(id);
    };

    /**
     * @method
     */
    strawCorePt.generateStrawCallUrl = function (id) {
        return 'straw://' + id;
    };

    /**
     * @method
     */
    strawCorePt.storeCallback = function (callback) {

        if (callback == null || callback.id == null) {
            return;
        }

        this.cbTable[callback.id] = callback;
    };

    /**
     * Retrieve callback object from the callback table.
     *
     * @param {string} id callback id
     * @param {boolean} keepAlive keep callback or not
     * @return CallbackPair retrieved callback or undefined if not found
     */
    strawCorePt.retriveCallback = function (id, keepAlive) {
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
     */
    strawCorePt.storeParams = function (params) {

        if (params == null || params.callId == null) {
            return;
        }

        this.pTable[params.callId] = params;

    };

    /**
     * @method
     */
    strawCorePt.retriveParams = function (id) {
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
     * Process callback invocation from Straw native bridge
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
     * Call a Straw service method.
     *
     * @param {String} service the service name
     * @param {String} method the method name
     * @param {Object} params the parameter
     * @param {Function} successCallback the success callback
     * @param {Function} failureCallback the failure callback
     * @return {void}
     */
    strawApiPt.callServiceMethod = function (service, method, params, successCallback, failureCallback) {
        strawCore.exec(service, method, params, successCallback, failureCallback);
    };

    /**
     * @method
     * Succeed service call and don't keep a callback function.
     *
     * @param {String} callId the Service call id
     * @param {Object} params the parameter object which contains code and message fields
     * @return {void}
     */
    strawApiPt.succeed = function (callId, params) {
        strawCore.nativeCallback(callId, true, params, false);
    };

    /**
     * @method
     * Fail service call and don't keep a callback function.
     *
     * @param {String} callId the Service call id
     * @param {Object} params the parameter object which contains code and message fields
     * @return {void}
     */
    strawApiPt.fail = function (callId, params) {
        strawCore.nativeCallback(callId, false, params, false);
    };

    /**
     * @method
     * Succeed service call and keep a callback function.
     *
     * @param {String} callId the Service call id
     * @param {Object} params the parameter object which contains code and message fields
     * @return {void}
     */
    strawApiPt.succeedAndKeepAlive = function (callId, params) {
        strawCore.nativeCallback(callId, true, params, true);
    };

    /**
     * @method
     * Fail service call and keep a callback function.
     *
     * @param {String} callId the Service call id
     * @param {Object} params the parameter object which contains code and message fields
     * @return {void}
     */
    strawApiPt.failAndKeepAlive = function (callId, params) {
        strawCore.nativeCallback(callId, false, params, true);
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
