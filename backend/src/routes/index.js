const homeRouter = require('./HomeRoute');
const settingRouter = require('./DashboardRoute');
const userRouter = require('./UserRoute');
const controlRouter = require('./ControlRoute');


function routes(app) {
    app.use('/', HomeRoute);
    app.use('/dashboard', DashboardRoute);
    app.use('/user', UserRoute);
    app.use('/control', ControlRoute);
}

module.exports = routes;
