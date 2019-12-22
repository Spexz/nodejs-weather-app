const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require ('./utils/geocode')
const forecast = require ('./utils/forecast')

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Adrian Fraser'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Adrian Fraser'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Adrian Fraser'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send ({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            return res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

    /*res.send({
        location: 'Jamaica',
        forecast: 'Cloudy with 5% chance of rain.',
        address: req.query.address
    })*/
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send ({
            error: 'You must provide a search term'
        })
    }
    
    res.send ({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    //res.send('Help article not found')
    res.render('404', {
        title: '404 Page',
        message: 'Help article not found',
        url: req.url,
        name: 'Adrian Fraser'
    })
})

app.get('*', (req, res) => {
    //res.send('My 404 page')
    res.render('404', {
        title: '404 Page',
        message: 'Page not found',
        url: req.url,
        name: 'Adrian Fraser'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})