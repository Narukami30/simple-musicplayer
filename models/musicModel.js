
const db = require('../config/database');

const MusicModel = {
  getAllSongs: (callback) => {
    const sql = 'SELECT * FROM songs';
    db.query(sql, callback);
  },

  saveSong: (title, filePath, callback) => {
    const sql = 'INSERT INTO songs (title, file_path) VALUES (?, ?)';
    db.query(sql, [title, filePath], callback);
  }
};

module.exports = MusicModel;
