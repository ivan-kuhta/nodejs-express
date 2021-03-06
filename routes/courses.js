const {Router} = require('express');
const Course = require('../models/course');
const course = require('../models/course');

const auth = require('../middleware/auth');


const router = Router()

router.get('/', async (request, response, next) => {
    // const courses = await Course.getAll()
    const courses = await Course.find().populate('userId', 'email name').select('price title img');

    // console.log(courses)

    response.render('courses', {
        title: 'Курси',
        isCourses: true,
        courses
    })
})

router.get('/:id/edit', auth, async (request, response) => {
    if(!request.query.allow) {
        return response.redirect('/')
    }

    // const course = await Course.getById(request.params.id);
    const course = await Course.findById(request.params.id);

    response.render('course-edit', {
        title: `Редагувати "${course.title}"`,
        course
    })
})

router.post('/edit', auth, async (request, response) => {
    // await Course.update(request.body)
    const {id} = request.body;
    delete request.body.id;

    await Course.findByIdAndUpdate(id, request.body)
    response.redirect('/courses')
})

router.post('/remove', auth, async (request, response) => {
    try {
        await Course.deleteOne({_id: request.body.id})
        response.redirect('/courses')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (request, response) => {
    // const course = await Course.getById(request.params.id);
    const course = await Course.findById(request.params.id);
    response.render('course', {
        layout: 'empty',
        title: `Курс "${course.title}"`,
        course
    })
})

module.exports = router