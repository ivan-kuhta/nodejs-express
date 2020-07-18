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
app.set('views', 'views')

app.use(express.static('public'));

app.get('/', (request, response, next) => {
    response.render('index', {
        title: 'Головна сторінка',
        isHome: true
    })
})

app.get('/courses', (request, response, next) => {
    response.render('courses', {
        title: 'Курси',
        isCurses: true
    })
})

app.get('/add', (request, response, next) => {
    response.render('add', {
        title: 'Добавити курс',
        isAdd: true
    })
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is runnung http://127.0.0.1:${PORT}`);
})