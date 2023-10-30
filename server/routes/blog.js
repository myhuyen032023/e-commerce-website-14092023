const router = require("express").Router()
const ctrls = require('../controllers/blog');
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken");
const fileUploader = require('../config/cloudinary.config');

router.get('/', ctrls.getBlogs)
router.get('/:bid', ctrls.getBlog)
router.put('/like/:bid', verifyAccessToken,ctrls.likeBlog)
router.put('/dislike/:bid', verifyAccessToken,ctrls.dislikeBlog)


router.post('/', [verifyAccessToken, isAdmin], ctrls.createNewBlog)
router.put('/:bid', [verifyAccessToken, isAdmin], ctrls.updateBlog)
router.put('/uploadimage/:bid', [verifyAccessToken, isAdmin],fileUploader.single("image"), ctrls.uploadBlogImage)
router.delete('/:bid', [verifyAccessToken, isAdmin], ctrls.deleteBlog)

module.exports = router