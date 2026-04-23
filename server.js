const express = require('express');
const path = require('path');
const app = express();

// Set view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Exodus Motors | Premium Automotive Solutions' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us | Exodus Motors' });
});

app.get('/products', (req, res) => {
    res.render('products', { title: 'Our Products | Exodus Motors' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services | Exodus Motors' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us | Exodus Motors' });
});

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
