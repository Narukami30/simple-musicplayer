
const express = require('express');
const multer = require('multer');
const path = require('path');
const MusicModel = require('../models/musicModel');

const router = express.Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


router.get('/', (req, res) => {
  MusicModel.getAllSongs((err, songs) => {
    if (err) throw err;
    res.render('index', { songs });
  });
});

router.post('/upload', upload.single('music'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const songTitle = req.file.originalname;
  const songPath = `/uploads/${req.file.filename}`;

  MusicModel.saveSong(songTitle, songPath, (err) => {
    if (err) throw err;
    console.log('File saved to database');
    res.redirect('/');
  });
});

module.exports = router;
