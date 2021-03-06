const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');

// GET home page.
router.get('/', function(req, res) {
  let promise = new Promise((resolve, reject) => {
    request.get('https://api.coinranking.com/v1/public/coin/1/history/30d', (err, response, body) => {
      if (err || response.statusCode !== 200) {
        reject(err)
      }

      try {
        const data = JSON.parse(body).data.history;
        const filteredData = organizeData(data);
        resolve(filteredData)
      } catch (error) {
        res.send(`${error.name}: ${error.message}`);
      } 

    });
  });

  promise.then((filteredData) => {
    res.render('index', { filteredData });
  }).catch((err) => {
    res.send(`${err.name}: ${err.message}`);
  });
});

// Takes information from api and extrapolates data to send to view.
// Date (yyyy,MM,dd), Price, Difference (from previous day), Change (up, down, same), Day of Week.
function organizeData(data) {
  if (!Array.isArray(data)) {
    const err = new TypeError('data must be an array');
    console.log(`${err.name}: ${err.message}`);
  }

  const filteredDate = [];
  for (let i = 0; i < data.length; i++) {
    const entry = data[i];
    const dateTime = entry.timestamp;
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Checks if it's the first entry of the day time 00:00:00
    if (hours + minutes + seconds === 0) {
      const currentPrice = entry.price;
      const lastPrice = i > 0 ? data[i - 1].price : 0;
      const priceDict = formatPrice(currentPrice, lastPrice);
      const dateDict = formatDate(date);
      filteredDate.push({price: priceDict, date: dateDict})
    }
  }

  return filteredDate;
};

function formatPrice(current, last) {
    if (!current) { 
      current = 0;
    }

    if (!last) {
      last = 0;
    }

    const difference = current - last;
    const change = (() => { 
      if (current < last) {
        return 'down';
      } else if (current > last) {
        return 'up';
      } else {
        return 'same';
      }
    })();

    const priceObj = {
                        price: current,
                        change: difference,
                        direction: change
                      }

  return priceObj;
}

function formatDate(dateTime) {
  if (!dateTime) {
    dateTime = new Date();
  }

  const getDayString = (dayInt) => {
    const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    return dayArr[dayInt];
  };

  const dateString = ('0' + dateTime.getDate()).slice(-2);
  const monthString = ('0' + (dateTime.getMonth() + 1)).slice(-2);
  const dayString = getDayString(dateTime.getDay());
  const year = dateTime.getFullYear();

  const dateObj = {
                year: year,
                month: monthString,
                date: dateString,
                day: dayString
              }
  
  return dateObj;
};

module.exports = router;
module.exports.formatDate = formatDate;
module.exports.formatPrice = formatPrice;