const {Router} = require('express');

const router = Router()

router.get('/', (request, response, next) => {
    response.render('index', {
        title: 'Головна сторінка',
        isHome: true
    })
})


module.exports = router