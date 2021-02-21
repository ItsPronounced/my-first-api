require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//routes
const navigationRouter = require('./api/routes/navigation.routes');
const productsRouter = require('./api/routes/products.routes');
const applicationsRouter = require('./api/routes/applications.routes');
const marketsRouter = require('./api/routes/markets.routes');
const suppliersRouter = require('./api/routes/suppliers.routes');
const manufacturersRouter = require('./api/routes/manufacturers.routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded( {extended: false } ));
app.use(cookieParser());

//app.use routers
app.use('/api/navigation', navigationRouter);
app.use('/api/products', productsRouter);
app.use('/api/applications', applicationsRouter);
app.use('/api/markets', marketsRouter);
app.use('/api/manufacturers', manufacturersRouter);
app.use('/api/suppliers', suppliersRouter);


// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     console.error(err.message, err.stack);
//     res.status(statusCode).json({'message': err.message});

//     return;
// });


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("server up and running on http://localhost:"+ port);
});

module.exports = app;