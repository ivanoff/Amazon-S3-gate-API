'use strict';
var Calculator = require('./index').Calculator

describe('Calculator my tests', function () {
    beforeEach(function () {
        this.calc = new Calculator()
    })
    afterEach(function () {
        this.calc = null
    })

    describe('#add/multiply numbers and Infinities', function () {
        it('should add numbers', function () {
            this.calc.add(500, -400).should.not.eql(-100).and.eql(100)
        })
        it('should add numbers', function () {
            this.calc.add(500, Infinity).should.eql(Infinity)
        })
        it('should add numbers', function () {
            this.calc.add(-Infinity, Infinity).should.eql(NaN)
        })
        it('should multiply numbers', function () {
            this.calc.multiply(50000000000, -4000000000000000000).should.not.eql(Infinity).and.eql(-2e+29)
        })
        it('should multiply numbers', function () {
            this.calc.multiply(5, -Infinity).should.eql(-Infinity)
        })
        it('should validate NaN', function () {
            this.calc.multiply.bind(this.calc, NaN, 0).should.throw(/Argument error/);
        })
    })

});
