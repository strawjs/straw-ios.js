// straw-ios.js

this.straw = (function () {
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
     * @class Straw
     */
    var Straw = function () {

        // table of callbacks
        this.cbTable = {};

        // table of Service call parameters
        this.paramsTable = {};

    };

    var strawPt = Straw.prototype;

    strawPt.exec = function (service, method, params, successCallback, failureCallback) {

        var id = genId();

        var callback = new CallbackPair(id, successCallback, failureCallback);

        this.storeCallback(callback);

        var requestParams = {callId: id, service: service, method: method, params: params};

        this.storeParams(requestParams);

        this.invokeNativeBridge(id);
    };

    strawPt.invokeNativeBridge = function (id) {
        location.href = this.generateStrawCallUrl(id);
    };

    strawPt.generateStrawCallUrl = function (id) {
        return 'straw://' + id;
    };

    strawPt.storeCallback = function (callback) {

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
    strawPt.retriveCallback = function (id, keepAlive) {
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

    strawPt.storeParams = function (params) {

        if (params == null || params.callId == null) {
            return;
        }

        this.pTable[params.callId] = params;

    };

    strawPt.retriveParams = function (id) {
        var params = this.pTable[id];

        if (!params) {
            window.console.log('[Warn] param for id=' + id + ' not found');

            return;
        }

        delete this.pTable[id];

        return params;
    };

    /**
     * Process callback invocation from Straw native bridge
     *
     * @param string id the id
     * @param boolean isSuccess is success or not
     * @param params parameters for Service callback
     * @param boolean keepAlive keep callback or not
     @ @return void
     */
    strawPt.nativeCallback = function (id, isSuccess, params, keepAlive) {

        var callback = this.retrieveCallback(id, keepAlive);

        if (callback != null) {

            callback.call(params);
        }

    };

    var exports = new Straw();

    return exports;

}());
