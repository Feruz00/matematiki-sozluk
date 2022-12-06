const express = require('express')
const passport = require('passport')
const cors = require('cors')
const app = express()
const session = require('express-session');

app.use(cors({
    origin: ['http://localhost:3000', process.env.CLIENT],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized:false,
    resave: false
}));


// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', require('./routes/authRoutes'))
app.use('/api/v1/lang', require('./routes/languageRoutes'))
app.use('/api/v1/word', require('./routes/wordRoutes'))


module.exports = app