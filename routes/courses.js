const {Router} = require('express');
const Course = require('../models/course');

const router = Router()

router.get('/', async (request, response, next) => {
    const courses = await Course.getAll()
    response.render('courses', {
        title: 'Курси',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit', async (request, response) => {
    if(!request.query.allow) {
        return response.redirect('/')
    }

    const course = await Course.getById(request.params.id);

    response.render('course-edit', {
        title: `Редагувати "${course.title}"`,
        course
    })
})

router.post('/edit', async (request, response) => {
    await Course.update(request.body)
    response.redirect('/courses')
})

router.get('/:id', async (request, response) => {
    const course = await Course.getById(request.params.id);
    response.render('course', {
        layout: 'empty',
        title: `Курс "${course.title}"`,
        course
    })
})


module.exports = router