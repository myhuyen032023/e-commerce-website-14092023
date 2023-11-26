const router = require('express').Router();
const ctrls = require('../controllers/product');
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken");
const fileUploader = require('../config/cloudinary.config');

//Guest & user
router.put('/ratings', verifyAccessToken, ctrls.ratings);
router.get('/:pid', ctrls.getProduct);
router.get('/', ctrls.getProducts);


//Admin
router.post('/', [verifyAccessToken, isAdmin],fileUploader.fields([
    {name: 'images', maxCount: 10},
    {name: 'thumb', maxCount: 1}
]),ctrls.createProduct);
router.put('/:pid', [verifyAccessToken, isAdmin],fileUploader.fields([
    {name: 'images', maxCount: 10},
    {name: 'thumb', maxCount: 1}
]),ctrls.updateProduct);
router.put('/uploadimage/:pid', [verifyAccessToken, isAdmin], fileUploader.array('images'),ctrls.uploadProductImage); //upload file key: image
router.delete('/:pid', [verifyAccessToken, isAdmin],ctrls.deleteProduct);







module.exports = router
