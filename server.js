const express = require('express');
const path = require('path');
const fs =require('fs')
const config = require('./config.js');
const cache = require('./cache.js');
var fileUpload = require('express-fileupload');
const app = express();
function makeid() {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  
  for ( var i = 0; i < 5; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  blacklist = ["up","up.php","u","u.php","upload","upload.php","","domains","public","assets"]
  if(blacklist.includes(result)){
    result = makeid()
  }
  return result;
}

app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true,
    limits: {
        fileSize: config.fileSizeLimit
    }
}));

app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname + '/public')));

app.get('/', (req, res) => {
  res.render('index', {})
  // res.sendFile(__dirname + '/public/index.html')
})
app.get('/domains', (req, res) => {
  cache.checkCache((c) => {
    res.render('domains', {
      cache: c
    })
    // res.send(c)
  })

})
app.get('/assets/styles.css', (req, res) => {
  res.sendFile(__dirname + '/public/style.css')
})
app.get('/ping', (req, res) => {
  res.send('~')
})
app.get('/api/v1/status', (req, res) => {
  cache.checkCache((c) => {
    res.send(c)
  })
})
app.get('/domains', (req, res) => {



})
app.post('/up.php', (req, res) => {
  return  handleUpload(req, res)
})
app.post('/upload.php', (req, res) => {
  return handleUpload(req, res)
})
app.post('/up',  (req, res) => {
  return handleUpload(req, res)
})
app.post('/upload', (req, res) => {
  // res.send('test')
  return handleUpload(req, res)
})
app.post('/u.php', (req, res) => {
  return handleUpload(req, res)
})
app.post('/u', (req, res) => {
  return handleUpload(req, res)
})
app.get('/:img', (req,res) => {
  file = __dirname  + path.sep + "images" + path.sep + req.params.img
  console.log('grabbing ' + file)
  fs.readFile(file, (err, data) => {
    if(err){
      console.log(err)
      res.send('an error has occured, maybe this file doesnt exist?')
    }else{
    res.send(data)
  }
  })
})

function handleUpload(req, res) {

  // console.log(req.files)
  const id = makeid();
  extension = req.files.sharex.name.split('.')[1] || ''
  if(['bat','exe'].includes(extension)){

  }
  req.files.sharex.mv(__dirname + '/images/' + id + '.' + extension)
  res.send('https://' + req.hostname + '/' + id + '.' + extension)
}
const listener = app.listen(4004, function () {
  cache.initCache()
  console.log('[FILE.WINE] Launched on port ' + listener.address().port);
});
