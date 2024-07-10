const router = require("express").Router()
const ctrls = require('../controllers/blog');
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken");
const fileUploader = require('../config/cloudinary.config');

router.get('/', ctrls.getBlogs)
router.get('/:bid', ctrls.getBlog)
// router.put('/like/:bid', verifyAccessToken,ctrls.likeBlog)
// router.put('/dislike/:bid', verifyAccessToken,ctrls.dislikeBlog)


router.post('/', [verifyAccessToken, isAdmin],fileUploader.fields([
    {name: 'images', maxCount: 10},
    {name: 'thumb', maxCount: 1}
]),ctrls.createNewBlog);
router.put('/:bid', [verifyAccessToken, isAdmin],fileUploader.fields([
    {name: 'images', maxCount: 10},
    {name: 'thumb', maxCount: 1}
]),ctrls.updateBlog);
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog)

module.exports = router