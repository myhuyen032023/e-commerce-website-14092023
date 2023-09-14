const userRouter = require('./user');

const {notFound, errHandler} = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter)


    //App se lan luot check xem url trung voi route nao
    //Neu khong co route nao trung thi ta se bat loi
    app.use(notFound);
    app.use(errHandler);
}



module.exports = initRoutes