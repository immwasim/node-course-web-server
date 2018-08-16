const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('viewEngine', 'hbs' );



//next exists to chain middleware and then finally pass off execution to 
//the route logic. 
//it MUST be called otherwise the request will hang. 
//Sometimes this might be beneficial
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}, ${req.method}, ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err);
    })

    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//register middleware that performs functionality on the req or res
// before hitting the main logic
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getYear', () => {
    return (new Date().getFullYear());
});

hbs.registerHelper('screamIt', (text) => {
    return (text.toUpperCase());
});

//routes
app.get('/', (req, res) => {
    // res.send('<h1>hello express!</h1>');
    res.render('home.hbs', {
        title: 'HOMEEEE',
        welcome:'ohFF hai!'
    });
});

app.get('/about', (req, res) => {
    
    //looks for files in views directory by default.
    //template, data
    res.render('about.hbs', {
        title: 'ABOOT',
    });

});

app.get('/bad', (req, res) => {
    res.send({
        error:'errrorr!!!'
    });
});


//3000 is common but not necessary to use.
app.listen(3000, () => {
    console.log('server ready');
});