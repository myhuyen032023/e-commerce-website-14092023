const userRouter = require('./user');
const productRouter = require('./product');
const productCategoryRouter = require('./productCategory');
const blogCategoryRouter = require('./blogCategory');



const {notFound, errHandler} = require('../middlewares/errorHandler');

const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/productCategory', productCategoryRouter)
    app.use('/api/blogCategory', blogCategoryRouter)


    //App se lan luot check xem url trung voi route nao
    //Neu khong co route nao trung thi ta se bat loi
    app.use(notFound);
    app.use(errHandler);
}



module.exports = initRoutes