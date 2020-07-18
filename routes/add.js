const {Router} = require('express');

const router = Router()

router.get('/', (request, response, next) => {
    response.render('courses', {
        title: 'Курси',
        isCurses: true
    })
})


module.exports = router