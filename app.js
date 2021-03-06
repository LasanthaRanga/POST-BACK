const express = require('express');
const port = process.env.PORT || 3000;

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const cors = require('cors');
const app = express();


const indexRouter = require('./routers/index');
const usersRout = require('./routers/userRout');
const instituteRout = require('./routers/institure');
const sectionRout = require('./routers/section');
const letterRout = require('./routers/letter');
const uploadRout = require('./routers/upload');


const allowedOrigins = [
    '*',
    'capacitor://localhost',
    'ionic://localhost',
    'http://localhost',
    'http://localhost:4200',
    'http://localhost:8080',
    'http://localhost:8100',
    'https://post.cat2020.org',
    'https://www.post.cat2020.org',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Origin not allowed by CORS'));
        }
    }
}

app.options('*', cors(corsOptions));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/user', usersRout);
app.use('/institute', instituteRout);
app.use('/section', sectionRout);
app.use('/letter', letterRout);
app.use('/up', uploadRout);




app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    console.log(error.message);
    next(error);
});



app.get('/', cors(corsOptions), (req, res, next) => {
    res.json({ message: 'This route is CORS-enabled for an allowed origin.' });
})


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


app.listen(port);