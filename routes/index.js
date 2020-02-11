const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
  fs.readFile('public/data.json', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    data = data.data.history;
    console.log(data)
    res.render('index', { data });
  })
  
});

module.exports = router;
