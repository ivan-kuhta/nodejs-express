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
    // const course = new Course(request.body.title, request.body.price, request.body.img);
    const course = new Course({
        title: request.body.title,
        price: request.body.price,
        img: request.body.img
    })

    try {
        await course.save()
        response.redirect('/courses')
    } catch (e) {
        console.log(e)
    }
})


module.exports = router