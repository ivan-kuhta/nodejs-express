const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.get('/', (request, response, next) => {
    response.sendFile(path.join(__dirname, 'views', 'index.html'))
})

app.get('/about', (request, response, next) => {
    response.sendFile(path.join(__dirname, 'views', 'about.html'))
})



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is runnung http://127.0.0.1:${PORT}`);
})