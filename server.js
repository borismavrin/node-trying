const express = require("express");
const hbs = require('hbs');
const fs = require('fs');
const port= process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to log');
        }
    })
    next();
});
// app.use((req, res, next)=>{
//   res.render('maintainence.hbs');
// //To stop showing pages, but that one
// });
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: "Hello, stranger",
        pageText: "This is training helloing page"
    });
});
app.get('/about', (req, res) => {
    //res.send('about page');
    res.render('about.hbs', {
        pageTitle: "About page"
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: "Sorry, couldn't find your page"
    });
});
app.get('/cookbook', (req, res) => {
    res.render('cookbook.hbs', {
      pageTitle: "Das ist Kücherbuch!",
      pageBody: "Ja, würtig!"
    });
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
