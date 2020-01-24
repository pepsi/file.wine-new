const express = require('express');
const path = require('path');
const fs = require('fs')
const config = require('./config.js');
const cache = require('./cache.js');
var fileUpload = require('express-fileupload');
const app = express();

function makeid() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;

  for (var i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  blacklist = ["up", "up.php", "u", "u.php", "upload", "upload.php", "", "domains", "public", "assets"]
  if (blacklist.includes(result)) {
    result = makeid()
  }
  return result;
}

app.use(fileUpload({
  safeFileNames: false,
  preserveExtension: true,
  limits: {
    fileSize: config.fileSizeLimit
  }
}));

app.set('view engine', 'pug')
app.use('/static', express.static(path.join(__dirname + '/public')));
app.get('/sharex', (req, res) => {
  _config = `{
  "Version": "12.4.1",
  "DestinationType": "ImageUploader, TextUploader, FileUploader",
  "RequestMethod": "POST",
  "RequestURL": "http://${req.host}/up.php",
  "Body": "MultipartFormData",
  "FileFormName": "sharex"
  }`
  res.set('Content-Disposition', 'attachment;filename=' + req.host + '.sxcu')
  res.set("Content-Type", "application/octet-stream");
  res.send(_config)
})
app.get('/', (req, res) => {
  res.render('index', {})
})
app.get('/domains', (req, res) => {
  cache.checkCache((c) => {
    res.render('domains', {
      cache: c
    })
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
app.get('/:img', handleGrabImage)
app.get('/i/:img', handleGrabImage)

app.post('/up.php', (req, res) => {
  return handleUpload(req, res)
})
app.post('/upload.php', (req, res) => {
  return handleUpload(req, res)
})
app.post('/up', (req, res) => {
  return handleUpload(req, res)
})
app.post('/upload', (req, res) => {
  return handleUpload(req, res)
})
app.post('/u.php', (req, res) => {
  return handleUpload(req, res)
})
app.post('/u', (req, res) => {
  return handleUpload(req, res)
})
app.post('/i/up.php', (req, res) => {
  return handleUpload(req, res)
})
app.post('/i/upload.php', (req, res) => {
  return handleUpload(req, res)
})
app.post('/i/up', (req, res) => {
  return handleUpload(req, res)
})
app.post('/i/upload', (req, res) => {
  return handleUpload(req, res)
})
app.post('/i/u.php', (req, res) => {
  return handleUpload(req, res)
})
app.post('/i/u', (req, res) => {
  return handleUpload(req, res)
})
function handleGrabImage(req, res) {
  file = __dirname + path.sep + "images" + path.sep + req.params.img
  if(fs.existsSync(file)){
  res.sendFile(file)
  }else{
    res.render('404', {
      reason: "Image not found. Did you type the URL correctly?"
    })
  }
}
app.all('*',(req,res) => {
  res.render('404', {
    reason: "Page not found. Did you type the URL correctly?"
  })
})
function handleUpload(req, res) {
  const id = makeid();
  if(req.files){
    if(req.files.sharex){
      extension = req.files.sharex.name.split('.')[1] || ''
      if (['bat', 'exe'].includes(extension)) {
    
      }
      req.files.sharex.mv(__dirname + '/images/' + id + '.' + extension)
      res.send('https://' + req.hostname + '/' + id + '.' + extension)
    }else{
      res.send("No file named sharex was uploaded.")
    }
  }else{
    res.send("No file uploaded.")
  }
}
const listener = app.listen(4004, function () {
  cache.initCache()
  console.log('[FILE.WINE] Launched on port ' + listener.address().port);
});