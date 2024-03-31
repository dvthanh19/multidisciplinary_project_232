const homeRoute = require('./HomeRoute');
const dashboardRoute = require('./DashboardRoute');
const userRoute = require('./UserRoute');
const controlRoute = require('./ControlRoute');


function routes(app) {
    app.use('/', homeRoute);
    app.use('/dashboard', dashboardRoute);
    app.use('/user', userRoute);
    app.use('/control', controlRoute);
}

module.exports = routes;
