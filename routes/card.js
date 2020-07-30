const {Router} = require('express');
// const Card = require('../models/card');
const Course = require('../models/course');
const router = Router();

const auth = require('../middleware/auth');


router.post('/add', auth, async (req, res) => {
    const course = await Course.findById(req.body.id)
    await req.user.addToCart(course);
    // await Card.add(course)
    res.redirect('/card')
})

function mapCartItems(cart){
    return cart.items.map(c => ({
        ...c.courseId._doc, count: c.count, id: c.courseId.id
    }));
}

function computePrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count;
    }, 0)
}

router.get('/', auth, async (req, res) => {
    // const card = await Card.fetch();
    const user = await req.user.populate('cart.items.courseId').execPopulate();

    const courses = mapCartItems(user.cart)
    // console.log(courses);
    
    // console.log(user.cart.items);

    res.render('card', {
        title: 'Корзина',
        isCard: true,
        courses,
        price: computePrice(courses)
        // ...card
    })
    // res.json({text:true});
})

router.delete('/remove/:id', auth, async(req, res) => {
    // const card = await Card.remove(req.params.id);
    // res.status(200).json(card)
    await req.user.removeFromCart(req.params.id)
    const user = await req.user.populate('cart.items.courseId').execPopulate()

    const courses = mapCartItems(user.cart)
    const cart = {
        courses, price: computePrice(courses)
    }
    res.status(200).json(cart)
})

module.exports = router