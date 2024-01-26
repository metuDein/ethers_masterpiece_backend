const { logEvents } = require('./logEvents')


const errorrLogger = (err, req, res, next) => {
    logEvents(`${err.name} : ${err.message}`, 'errorLog.txt')
    console.log(`${err.name} : ${err.message}`)
    res.status(500)
    res.send(err.message)
}

module.exports = errorrLogger