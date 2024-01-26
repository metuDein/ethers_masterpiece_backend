const { v4: uuid } = require('uuid')
const { format } = require('date-fns')
const fs = require('fs')
const { join } = require('path')
const fsPromises = require('fs').promises

const logEvents = async (message, logFileName) => {
    const date = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logData = `${message}\t${date}\t${uuid()}\n`

    if (!fs.existsSync(join(__dirname, '..', 'logs'))) {
        await fsPromises.mkdir(join(__dirname, '..', 'logs'))
    }

    await fsPromises.appendFile(join(__dirname, '..', 'logs', logFileName), logData)
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}`, 'reqLog.txt')
    console.log(`${req.method}\t${req.url}\t${req.origin}`)
    next()
}

module.exports = {
    logger,
    logEvents
}