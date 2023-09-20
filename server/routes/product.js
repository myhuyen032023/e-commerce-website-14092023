const router = require('express').Router();
const ctrls = require('../controllers/product');
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken");

//Guest & user
router.put('/ratings', verifyAccessToken, ctrls.ratings);
router.get('/:pid', ctrls.getProduct);
router.get('/', ctrls.getProducts);


//Admin
router.post('/', [verifyAccessToken, isAdmin],ctrls.createProduct);
router.put('/:pid', [verifyAccessToken, isAdmin],ctrls.updateProduct);
router.delete('/:pid', [verifyAccessToken, isAdmin],ctrls.deleteProduct);







module.exports = router
