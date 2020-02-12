const express = require('express');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRouter);
app.use((req, res) => {

    res.status(404).render('not-found');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

module.exports = app;

