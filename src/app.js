const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
// by default, Express expects a "views" directory
// to override this, we configure it
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

// commented out lines do not get used when using above statement
app.get('/', (req, res) => {
    // res.send('<h1>Hello Express!</h1>') 
    res.render('index', {
        title: 'Weather App',
        author: 'Rachit Parwanda'
    })
})

app.get('/about', (req, res) => {
    // res.send('<h1>About Us</h1>')
    res.render('about', {
        title: 'About Me',
        author: 'Rachit Parwanda'
    })
})

app.get('/help', (req, res) => {
    // res.send('<h1>Help Page</h1>')
    res.render('help', {
        title: 'Help Page',
        author: 'Rachit Parwanda',
        helpMsg: 'This is a help msg.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'An address must be provided!'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                });
            }
            // console.log(req.query.address);
            // console.log(forecastData);
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term!'
        })
        return
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    // res.send('Help article not found!')
    res.render('404', {
        title: 'Error: 404',
        author: 'Rachit Parwanda',
        errorMsg: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    // res.send('Error 404: Page not found!')
    res.render('404', {
        title: 'Error: 404',
        author: 'Rachit Parwanda',
        errorMsg: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
})