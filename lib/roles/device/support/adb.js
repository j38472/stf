var syrup = require('syrup')

var adbkit = require('adbkit')

var logger = require('../../../util/logger')
var promiseutil = require('../../../util/promiseutil')

module.exports = syrup.serial()
  .define(function(options) {
    var log = logger.createLogger('device:support:adb')
    var adb = adbkit.createClient()

    function ensureBootComplete() {
      return promiseutil.periodicNotify(
          adb.waitBootComplete(options.serial)
        , 1000
        )
        .progressed(function() {
          log.info('Waiting for boot to complete')
        })
    }

    return ensureBootComplete()
      .return(adb)
  })