var Calculator = require('./src/lib/Calculator')

var argv = require('minimist')(process.argv.slice(2), {})

var options = parseArgs(argv)

if (!options) {
  console.error('invalid options')
  process.exit(1)
}

if (!options.operation) {
  console.error('invalid operation')
  process.exit(1)
}

if (!options.arguments || options.arguments.length < 2) {
  console.error('invalid arguments')
  process.exit(1)
}

try {
  var calc = new Calculator()
  var method = calc.resolveMethod(options.operation)
  if (!method) {
    throw new Error('operation ' + options.operation + ' isn\'t supported')
  }

  console.log(method.apply(calc, options.arguments))
}
catch (e) {
  console.error('runtime error: ', e)
  return process.exit(1)
}
finally {
  process.exit(0)
}

function parseArgs(argv) {
  var args = []
  var operation = null

  // calc.js 2 3 +
  if (argv._.length >= 3) {
    args.push(parseFloat(argv._[0]))
    args.push(parseFloat(argv._[1]))

    operation = argv._[2]
    // calc.js --num1 2 --num2 3 --operation +
  } else {
    if ('num1' in argv) {
      args.push(parseFloat(argv.num1))
    }
    if ('num2' in argv) {
      args.push(parseFloat(argv.num2))
    }
    if ('operation' in argv) {
      operation = argv.operation
    }
  }

  return {
    arguments: args,
    operation: operation
  }
}
