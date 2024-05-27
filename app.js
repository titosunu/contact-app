const express = require('express')
var expressLayouts = require('express-ejs-layouts');
const app = express()
const port = 3000

// use template engines
app.set('view engine', 'ejs');
app.use(expressLayouts);

// route
app.get('/', (req, res) => {
    const person = [
        {
            name: 'Pratito',
            age: 21,
            email: 'titosunu2001@gmail.com',
        },
        {
            name: 'adrian',
            age: 20,
            email: 'adrian.lutfi@gmail.com',
        },
        {
            name: 'titus',
            age: 24,
            email: 'titus@gmail.com',
        }
    ]
    res.render('index', { layout:'layouts/main', name: 'Pratito', title: 'Home Page', person});
});

app.get('/about', (req, res) => {
    res.render('about', { layout:'layouts/main', title: 'About Page' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { layout:'layouts/main', title: 'Contact Page' });
});

// middleware
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h1>404 not found</h1>')
});

// port
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});