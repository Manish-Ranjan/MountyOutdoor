const express = require('express')
const http = require('http')
const fs = require("fs")
const path = require('path')
const cookieParser = require('cookie-parser');
const app = express();
const connectDB = require("./lib/config/db.js")
const morgan = require('morgan')
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const UserRoute = require("./routes/User.route");

// mongodb connection
connectDB();

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

if (process.env.NODE_ENV === "development") {
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/favicon.ico', (req, res, next) => res.status(204).end());

//routes 
app.use('/user', UserRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json("Invalid request")
});

// error handler
app.use(function (err, req, res) {
    console.error(err.stack);
    // Send response status based on custom error code
    if (err.code) {
        res.status(err.code).json({ error: err.message });
    }

    // If no custom error is thrown then return 500(server side error/exception)
    res.status(500).json({ error: 'Something went wrong. Please try again' });
})

server.listen(PORT, () =>
    console.log(`App is listening on port ${PORT}.`)
)