const userRouter = require('./user');
const productRouter = require('./product');

const {notFound, errHandler} = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)



    //App se lan luot check xem url trung voi route nao
    //Neu khong co route nao trung thi ta se bat loi
    app.use(notFound);
    app.use(errHandler);
}



module.exports = initRoutes