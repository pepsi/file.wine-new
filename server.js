const express = require('express');
const app = express();
const config = require('./config.js');
const cache = require('./cache.js');
app.set('view engine', 'ejs')
app.get('/', (req,res) => {
  res.sendFile(__dirname + '/public/index.html')
})
app.get('/assets/styles.css', (req,res) => {
  res.sendFile(__dirname + '/public/style.css')
})
app.get('/ping', (req,res) => {
  res.send('~')
})
app.get('/api/v1/status', (req,res) => {
  cache.checkCache((c) => {
    res.send(c)
  })
})
app.get('/domains', (req, res) => {
  
  
  
})
const listener = app.listen(process.env.PORT, function() {
  cache.initCache()
  console.log('[FILE.WINE] Launched on port ' + listener.address().port);
});

//Should probably setup a config file/ dotenv fot a config??
//yea, that works
//dotenv for sensitive info only, keeping it cleaner
//they fr need to add a fucking chat man lol

//https://support.glitch.com/t/implement-a-channel-on-the-right-side/12292/3
//i made a thread a while ago on it

//should domain statuses be client-side or server side checked?
//probably server sided so we can cache it //serber sided
//and yea, we definitely wanna cache
