const homeRoute = require('./HomeRoute');
const dashboardRoute = require('./DashboardRoute');
const userRoute = require('./UserRoute');
const controlRoute = require('./ControlRoute');


function routes(app) {
    app.use('/', homeRouter);
    app.use('/dashboard', dashboardRoute);
    // app.use('/user', userRouter);
    // app.use('/control', controlRouter);
}

module.exports = routes;
