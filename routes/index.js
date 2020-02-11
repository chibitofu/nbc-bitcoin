const express = require('express');
const router = express.Router();
const fs = require('fs');

// GET home page.
router.get('/', function(req, res) {
  fs.readFile('public/data.json', (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    data = data.data.history;
    const filteredData = organizeData(data);
    res.render('index', { filteredData });
  })
});

// Takes information from api and extrapolates data to send to view.
// Date (yyyy,MM,dd), Price, Difference (from previous day), Change (up, down, same), Day of Week.
function organizeData(data) {
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
    const difference = current - last;
    const change = (() => { 
      if (current > last) {
        return 'down';
      } else if (current < last) {
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

function getDayString(dayInt) {
 const dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

 return dayArr[dayInt];
};

module.exports = router;
