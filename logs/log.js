var log4js = require('log4js')

//普通形式
// log4js.configure({
//     appenders: { pipe: { type: 'dateFile', filename: 'logs/log/', pattern: 'yyyy-MM-dd', alwaysIncludePattern: true, } },
//     // 日志位置
//     replaceConsole: true,
//     categories: { default: { appenders: ['pipe'], level: 'info' } }
// });

// var logger = log4js.getLogger('pipe');
// // var consoleLog=log4js.getLogger('consoleLog')
// exports.logger = logger;
// exports.use = function (app) {
//     app.use(log4js.connectLogger(logger, { level: 'info', format: ':method:url' }))
// }

//json格式
log4js.addLayout('json', function (config) {
    return function (logEvent) {
        return JSON.stringify(logEvent) + config.separator
    }
});
log4js.configure({
    appenders: {
        type: {
            "type": "console",
            "category": "console"
        },
        out: {
            type: 'file',
            filename: "logs/log/error.log",
            layout: { type: 'json', separator: ',' }
        }
    },
    categories: {
        default: { appenders: ['out', 'type'], level: 'info' }
    }
})
var logger = log4js.getLogger('json-test')
exports.logger = logger;
exports.use = function (app) {
    app.use(log4js.connectLogger(logger, { level: 'info', format: ':method:url' }))
}

