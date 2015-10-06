var child_process = require('child_process')
var _ = require('lodash')

describe('calculator command line test', function () {
  [
    {
      args: [10, 2, '+'],
      result: 12
    },
    {
      args: [10, 2, '*'],
      result: 20
    }
  ].forEach(function (test) {
      context('operation: ' + test.args[test.args.length - 1], function () {
        it('should work with named args', function (done) {
          try {
            var execResult = execCalc([
              '--num1='+test.args[0],
              '--num2='+test.args[1],
              '--operation='+test.args[2]])

            execResult.stderr.should.be.empty
            parseFloat(execResult.stdout).should.eql(test.result)
          }
          catch (e) {
            return done(e)
          }

          done()
        })
        it('should work with default args', function (done) {
          try {
            var execResult = execCalc(test.args)

            execResult.stderr.should.be.empty
            parseFloat(execResult.stdout).should.eql(test.result)
          }
          catch (e) {
            return done(e)
          }

          done()
        })
      })
    });

  [
    {
      args: [],
      title: 'args is empty array'
    },
    {
      args: null,
      title: 'args is null'
    },
    {
      args: undefined,
      title: 'args is undefined'
    },
    {
      args: [1, 2, null],
      error: /operation null isn\'t supported/,
      title: 'operation is null'
    },
    {
      args: [1, 2, '$'],
      error: /operation \$ isn\'t supported/,
      title: 'operation is null'
    }
  ].forEach(function (test) {
      it('should return error when ' + test.title, function (done) {
        try {
          var execResult = execCalc(test.args)

          execResult.stdout.should.be.empty
          execResult.stderr.should.match(test.error || /operation/)
        }
        catch (e) {
          return done(e)
        }

        done()
      })
    })

  it('should omit named args if both - named and default specified', function (done) {
    try {
      var execResult = execCalc([1, 2, '+', '--num1=' + 3, '--num2=' + 5, '--operation=+'])

      execResult.stderr.should.be.empty
      parseFloat(execResult.stdout).should.be.eql(3)
    }
    catch (e) {
      return done(e)
    }

    done()
  })
})

function execCalc(args) {
  return child_process.spawnSync('node', _.flatten(['./index.js', args]), {
    encoding: 'utf8'
  })
}
