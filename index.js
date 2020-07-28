const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const session = require('express-session');

const homeRoutes = require('./routes/home');
const coursesRoutes = require('./routes/courses');
const addRoutes = require('./routes/add');
const cardRoutes = require('./routes/card');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');

const varMiddleware = require('./middleware/variables');

const User = require('./models/user');


const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// app.use(async (req, res, next) => {
//     try{
//         const user = await User.findById('5f16d58b01b1299f9fab27ac')
//         req.user = user
//         next();
//     } catch (e) {
//         console.log(e);
//     }
// })


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false
}));
app.use(varMiddleware);

app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)


const PORT = process.env.PORT || 3000;

async function start() {
    try {
        const password = '9ywk61JB6Gr028xc';
        const url =`mongodb+srv://ivan_kuhta:${password}@cluster0.yuzio.mongodb.net/shop`;
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        
        // const candidate = await User.findOne()
        // if(!candidate) {
        //     const user = new User({
        //         email: 'Ivan1998pi22342@ukr.net',
        //         name: 'Ivan',
        //         cart: {items: []}
        //     })
        //     await user.save();
        // }

        app.listen(PORT, () => {
            console.log(`Server is runnung http://127.0.0.1:${PORT}`);
        })
    } catch (e) {
        console.log(e)
    }
}

start();

