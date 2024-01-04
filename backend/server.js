const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const cors = require('cors');
const crypto = require("crypto-js")
const patnoks = require('./models/nKinModel')
const queryString = require('querystring')

const session = require('express-session');
const passport = require('passport');
require('./auth');

//connect to database
connectDB()
//OAuth2
const config ={
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    authUrl:process.env.AUTH_URL,
    redirectUrl:process.env.REDIRECT_URL,
    clientUrl:process.env.CLIENT_URL,
    tokenSecret:process.env.TOKEN_SECRET,
    tokenexpiration:process.env.TOKEN_EXPIRATION,
    postUrl:process.env.POST_URL
}


const app = express()

//Middleware body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:false,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}


    //second OAuth setup

    function isLoggedIn(req, res, next) {
        req.user ? next() : res.sendStatus(401);
      }

app.use(session({ secret: process.env.TOKEN_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/', isLoggedIn, (req, res) => {
  res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});



//CREATING A ROUTE IN EXPRESS
app.get('/', (req, res) =>{
    res.status(200).json({message: 'Welcome to the Support Desk API'})
})

//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/user2', require('./routes/user2Routes'))
app.use('/api/patients', require('./routes/patRoutes'))
app.use('/api/labs', require('./routes/labRoutes'))
app.use('/api/labs2', require('./routes/labRoutes2'))
app.use('/api/vitals', require('./routes/vitalRoutes'))
app.use('/api/patients2', require('./routes/patientRoutes'))
app.use('/api/kin', require('./routes/nKinRoutes'))
app.use('/api/ticket', require('./routes/ticketRoutes'))
app.use('/api/bills', require('./routes/billRoutes'))
app.get('/orders', (req, res) => {
    patnoks.aggregate([{
        $lookup: {
            from: 'patients',
            localField: 'patId',
            foreignField: 'patID',
            as: 'output'
        }
    }]).then(result => res.json(result)).catch(err => console.log(err))
});

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`))