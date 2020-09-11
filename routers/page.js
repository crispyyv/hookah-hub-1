const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const mime = require('mime')

router.use(fileUpload({}))

router.get('/', (req, res) => {
  res.render('pages/index.ejs', {title : "HookahHub"})
})

router.get('/info', (req, res) => {
  res.render('pages/about.ejs', {title : "Информация о нас"})
})
router.get('/articles', (req, res) => {
  res.render('pages/articles.ejs', {title : "Статьи"})
})
router.get('/search-hookah', (req, res) => {
  res.render('pages/hookah.ejs', {title : "Поиск по кальянам"})
})
router.get('/week-mix', (req, res) => {
  res.render('pages/week_mix.ejs', {title : "Микс недели"})
})
router.get('/editor-p.js', (req, res)=>{
  res.sendFile('./editor-p.js', {
    root: __dirname
  })
})

router.get('/editor', (req, res)=>{
  res.render('pages/editor', {title:"Редактор"})
})


router.post('/editor', function(req, res) {
  
  console.log(req.body); // the uploaded file object
})

router.post('/upload', function (req, res) {

  var A= 1;
  var B= 1;
  var C= 1;

  var folderName = path.join(__dirname, '../../public/img/img-' + A);

  if (!fs.existsSync(folderName)) {
    fs.mkdir(folderName, function (err) {
      if (err) {
        console.log(err);
      }
      else {

      }
    });
  }
  else {
    if (!req.files) {
      return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files.file.mimetype);
    console.log(req.files.file.data.byteLength);
    var sampleFile = req.files.file;
    sampleFile.mv(path.join(__dirname, '../', 'client/', 'test.jpg'), function (err) {
      var temp = path.join(__dirname, '../', 'client/', 'test.jpg');
      mime.lookup(path.join(__dirname, '../', 'client/', 'test.jpg'));         // => 'text/plain'
      if (err) {
        return res.status(500).send(err);
      }
      res.send({ 'location': '../test.jpg' });
    });
  }
});

module.exports = router