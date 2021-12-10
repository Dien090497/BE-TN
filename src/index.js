const express = require('express');
const exphdb = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
require('dotenv').config()

const app = express();
app.engine('handlebars', exphdb());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    name: 'session',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    maxAge: 60000,
}));
app.use(flash());
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Connect MySQL
const con = require("./config/db.js")

app.use(function(req, res, next) {
    req.con = con
    next()
})
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// RoutingWeb
//Login
const login = require("./routes/login");
app.use("/", login);

//Product
const product = require("./routes/product");
app.use("/product", product);

//News
const news = require("./routes/news");
app.use("/news", news);

//Order
const order = require("./routes/order");
app.use("/order", order);

//Administrator
const administrator = require("./routes/administrator");
app.use("/administrator", administrator);

//Help
const help = require("./routes/help");
app.use("/help", help);

//about us
const aboutUs = require("./routes/about-us");
app.use("/about-us", aboutUs);


// Routing Client
const clientLogin = require("./apiClient/routes/login");
app.use("/client", clientLogin);

const clientProduct = require("./apiClient/routes/product");
app.use("/client", clientProduct);

// const cart = require("./routes/cart");
// app.use("/carts", cart);

//


app.listen(process.env.PORT || 3002, () => {
    console.log('http://localhost:3002')
});
