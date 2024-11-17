require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3500;
const { join } = require('path')
const errorrLogger = require('./middleware/errorLogger')
const { logger } = require('./middleware/logEvents')
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const dbConn = require('./config/dbConn');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

dbConn()
app.use(logger)

// app.use(credentials)

app.use(cors(corsOptions))


app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.text({ limit: '200mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(cookieParser())
app.use(express.static(join(__dirname, 'public')))



// open routes
app.use('/', require('./routes/root'))

//  AUTHENTICATIONS
app.use('/register', require('./routes/authentication/register'))
app.use('/auth', require('./routes/authentication/auth'))
app.use('/refresh', require('./routes/authentication/refresh'))
app.use('/logout', require('./routes/authentication/logout'))


// COLLECTION ROUTES
app.use('/collections', require('./routes/collection/collection'))
app.use('/deletecollections', require('./routes/deleterequest/deleteCollection'))

// ASSET ROUTES
app.use('/assets', require('./routes/asset/asset'))
app.use('/deleteassets', require('./routes/deleterequest/deleteAsset'))

// USER ROUTES
app.use('/users', require('./routes/useractions/user'))
app.use('/userupdatewallet', require('./routes/useractions/updateWallet'))

// LIKES
app.use('/like', require('./routes/useractions/like'))
app.use('/dislike', require('./routes/deleterequest/dislike'))

// CART 
app.use('/cart', require('./routes/useractions/cart'))
app.use('/deletefromcart', require('./routes/deleterequest/deleteFromCart'))

// MESSAGES
app.use('/message', require('./routes/message/message'))
app.use('/deletemessage', require('./routes/message/deleteMessage'))

//EMAIL
app.use('/sendemail', require('./routes/messages/sendemail'))


//APP DATA
app.use('/appdata', require('./routes/frontend calls/appdata'))


// ADMIN USER ACTIONS
app.use('/adminuser', require('./routes/admin actions/useractions'))

// ADMIN COLLECTION ADMIN
app.use('/admincollection', require('./routes/admin actions/collectionaction'))

// ADMIN ASSETS 
app.use('/admineditasset', require('./routes/admin actions/assetsaction'))



// TEST ROUTES
app.use('/images', require('./routes/images'))
app.use('/deleteimages', require('./routes/deleterequest/deleteImage'))


// verify jwt routes


app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 - page not found' })
    } else {
        res.type('txt').send('404 - page not found')
    }
})

app.use(errorrLogger)




mongoose.connection.on('open', () => {
    console.log(`Connected to database`)
    app.listen(PORT, () => { console.log(`App running on port: ${PORT}`) })
})