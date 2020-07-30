const {Router} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');

const router = Router();

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: "Авторизація",
        isLogin: true,
        error: req.flash('error')
    })
});

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login#login')
    });
});

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if(candidate) {
            const areSame = await bcrypt.compare(password, candidate.password)
            // const areSame = password === candidate.password

            if(areSame) {
                // const user = await User.findById('5f16d58b01b1299f9fab27ac')
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save(err => {
                    if(err) {
                        throw err
                    }
                    res.redirect('/')
                })
            } else {
                req.flash('error', 'Неправильний пароль')
                res.redirect('/auth/login#login');
            }
        } else {
            req.flash('error', 'Такого користувача не існує')
            res.redirect('/auth/login#login');
        }
    } catch (e) {
        console.log(e)
    }
})

router.post('/register', async (req, res) => {
    try{
        const {email, password, repeat, name} = req.body;
        const candidate = await User.findOne({email})

        if (candidate) {
            req.flash('error', 'Користувач з таким email вже існує')
            res.redirect('/auth/login#register')
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            const user = new User({
                email, name, password: hashPassword, cart: {items: []}
            })
            await user.save()
        }
        res.redirect('/auth/login#login')
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;