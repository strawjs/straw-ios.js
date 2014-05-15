// straw-ios-spec.js

/* global describe, it, chai, sinon, straw */

describe('straw.core', function () {
    'use strict';

    var expect = chai.expect;

    it('exists', function () {

        expect(straw).not.to.equal(null);
        expect(straw.core).not.to.equal(null);

    });

});
