require("dotenv").config();
const express = require("express");
const path = require("path");
let request = require('request')
let querystring = require('querystring')

const app = express();

let redirect_uri = process.env.RE

app.use(express.static(path.join(__dirname, "./dist")));
app.use(express.json());

app.get('/login', function(req, res) {
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: 'user-read-private user-read-email',
      redirect_uri
    }))
})

app.get('/callback', function(req, res) {
  let code = req.query.code || null
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(
        process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
      ).toString('base64'))
    },
    json: true
  }
  request.post(authOptions, function(error, response, body) {
    var access_token = body.access_token
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
    res.redirect(uri + '?access_token=' + access_token)
    console.log('this is the spotify access token', access_token);

  })

})


// var access_token = body.access_token
// let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
// res.redirect(uri + '?access_token=' + access_token)
// console.log('this is the spotify access token', access_token);
app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);