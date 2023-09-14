// Dinh nghia ham xu ly loi not found
const notFound = (req, res, next) => {
    const error = new Error(`Route ${req.originalUrl} not found`);
    res.status(404);
    next(error);
}

const errHandler= (error, req, res, next) => {
    //Neu status la 200 ma van xuat hien loi --> chuyen sang 500
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    return res.status(statusCode).json({
        success: false,
        mes: error?.message
    })
}

module.exports = {
    notFound,
    errHandler
}