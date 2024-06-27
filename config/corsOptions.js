const White_List = require('./white_list')

const corsOptions = {
    origin: (origin, callback) => {
        if (White_List.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions