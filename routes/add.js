const {Router} = require('express');
const Course = require('../models/course')

const router = Router()

router.get('/', (request, response, next) => {
    response.render('add', {
        title: 'Добавити курс',
        isAdd: true
    })
})

router.post('/', async (request, response) => {
    // console.log(request.body);
    const course = new Course(request.body.title, request.body.price, request.body.img);

    await course.save()

    response.redirect('/courses')
})


module.exports = router