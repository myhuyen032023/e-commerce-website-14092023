const router = require('express').Router();
const ctrls = require('../controllers/user');
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken");
const uploader = require('../config/cloudinary.config')

router.post('/register', ctrls.register);
router.get('/finalRegister/:token', ctrls.finalRegister);
router.post('/login', ctrls.login);
router.get('/currentUser', verifyAccessToken, ctrls.getCurrentUser);
router.post('/refreshToken', ctrls.refreshAccessToken);
router.get('/logout', ctrls.logout);
router.post('/forgotpassword', ctrls.forgotPassword);
router.put('/resetpassword', ctrls.resetPassword);
router.delete('/remove-cart/:pid', verifyAccessToken,ctrls.removeProductInCart);
router.put('/cart', verifyAccessToken,ctrls.updateCart);






router.get('/', [verifyAccessToken, isAdmin], ctrls.getUsers);
router.delete('/:uid', [verifyAccessToken, isAdmin], ctrls.deleteUser);
router.put('/currentUser', [verifyAccessToken],uploader.single('avatar'), ctrls.updateUser);
router.put('/:uid', [verifyAccessToken, isAdmin], ctrls.updateUserByAdmin);










module.exports = router
