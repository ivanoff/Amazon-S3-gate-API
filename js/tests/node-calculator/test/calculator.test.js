'use strict';

var util = require('util')
var _ = require('lodash')
var sinon = require('sinon')

var Calculator = require('./index').Calculator

describe('Calculator lib tests', function () {
    beforeEach(function () {
        this.calc = new Calculator()
    })

    afterEach(function () {
        this.calc = null
    })

    describe('#add/positive', function () {
        it('should validate arguments', function () {
            this.calc.add.bind(this.calc, null, 1).should.throw(/Argument error/);
        })
        it('should add numbers', function () {
            this.calc.add(1, -2).should.not.eql(1).and.eql(-1)
        })
    })

    describe('#divide/positive', function () {
        it('should divide integers/floats', function () {
            this.calc.divide(1, 5).should.eql(.2)
            this.calc.divide(10.0, 1).should.eql(10)

            this.calc.divide(10.1, 10.2).should.be.approximately(.9, .1)
            this.calc.divide(1, 1.0).should.eql(1)
        })
    })

    describe('#divide/negative', function () {
        it('shouldn\'t divide by zero', function () {
            this.calc.divide.bind(this.calc, 100, 0).should.throw('false == true')
        })
    })

    describe('#assertNumber', function () {
        it('should call assertNumber', function (done) {
            var calc = new Calculator()
            var spy = sinon.spy(calc, 'assertNumber')

            spy.withArgs(1)
            spy.withArgs(2)

            calc.add(1, 2)

            spy.withArgs(2).calledOnce.should.be.ok
            spy.withArgs(1).calledOnce.should.be.ok

            spy.reset()
            done()
        })
    })

    describe('negative/dataset', function () {
        //Generate test pairs: e.g. [{}, '1'], [{}, true]
        [
            null, undefined,
            true, '1',
            NaN,
            {}, function () {
        }
        ].reduce(function (memo, item, i, arr) {
                var pairs = doGeneratePairs(item, arr.filter(function (e) {
                    return Number.isNaN(item) ? !Number.isNaN(e) : e !== item
                }))

                memo = memo.concat(pairs)

                return memo

                function doGeneratePairs(arg1, args) {
                    return args.map(function (arg) {
                        return [arg1, arg]
                    })
                }
            }, [])
            .forEach(function (args, i, arr) {
                ['add', 'subtract', 'multiply', 'divide'].forEach(function (method) {
                    it(util.format('should %s only numbers(%s, %s)', method, args[0], args[1]), function () {
                        this.calc[method].bind(this.calc, args[0], args[1]).should.throw(/Argument error/)
                    })
                })
            })
    })
});
