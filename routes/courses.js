const {Router} = require('express');

const router = Router()

router.get('/', (request, response, next) => {
    response.render('add', {
        title: 'Добавити курс',
        isAdd: true
    })
})


module.exports = router