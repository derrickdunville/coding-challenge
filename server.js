let express = require('express'),
    app = express(),
    API_BASE_URL = process.env.API_BASE_URL || 'http://localhost',
    API_PORT = process.env.API_PORT || 3001,
    MONGODB_URI = 'mongodb://localhost/coding_challenge',
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    //Mongoose Models
    Link = require('./api/models/linkModel'),
    //Routes
    linkRoutes = require('./api/routes/linkRoutes'),
    clickRoutes = require('./api/routes/clickRoutes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '127.0.0.1')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
    next()
})

linkRoutes(app)
clickRoutes(app)

app.use('/', express.static('apidoc'))
// catch 404 and forward to error handler
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

mongoose.Promise = require('bluebird')
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, function (err, res) {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    // Save database object from the callback for reuse.
    console.log("Database connection ready")
    // Initialize the app.
    const server = app.listen(API_PORT, function () {
        let port = server.address().port
        console.log("API now running on port", port)
    })
})

module.exports = app // for testing
