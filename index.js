const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');

const request = require('request');
const apiKey = '6f7421152f141c7c74a439b6b1078c61';


const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const app = express()
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false
});


// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .set('views', path.join(__dirname, 'views'))
//   .set('view engine', 'ejs')
//   .get('/', (req, res) => res.render('pages/index'))
//   .get('/cool', (req, res) => res.send(cool()))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.set('view engine', 'ejs')

  // app.get('/', (req, res) => res.render('pages/index'))
  app.get('/', function (req, res) {

        let city = req.body.city;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    // let weather
    // res.render('pages/index', {
    //   weather: null,
    //   error: 'Error, please try again'
    // });

    request(url, function (err, response, body) {
        console.log(body)
        if(err){
          console.log(12345)
          res.render('pages.index', {weather: null, error: 'Error, please try again'});
        } else {
          let weather = JSON.parse(body)

          if(weather.main == undefined){
            console.log(123)
            res.render('pages/index', {weather: null, error: 'Error, please try again'});
          } else {
            console.log(31)
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.render('pages/index', {weather: weatherText, error: null});
          }
        }
      });
  })

  app.listen(PORT, function () {
    console.log('Example app listening on port 500!')
  })



  app.post('/', function (req, res) {

      let city = req.body.city;
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

    request(url, function (err, response, body) {
        console.log(body)
        if(err){
          console.log(12345)
          res.render('pages/index', {weather: null, error: 'Error, please try again'});
        } else {
          let weather = JSON.parse(body)

          if(weather.main == undefined){
            console.log(123)
            res.render('pages/index', {weather: null, error: 'Error, please try again'});
          } else {
            console.log(31)
            let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
            res.render('pages/index', {weather: weatherText, error: null});
          }
        }
      });
  });
