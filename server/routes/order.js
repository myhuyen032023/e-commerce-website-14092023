const router = require("express").Router()
const {verifyAccessToken, isAdmin} = require("../middlewares/verifyToken")
const ctrls = require("../controllers/order")

router.post("/", verifyAccessToken, ctrls.createOrder)
router.get("/incomesindays", [verifyAccessToken, isAdmin], ctrls.getIncomesInDays)
router.get("/incomesinmonths", [verifyAccessToken, isAdmin], ctrls.getIncomesInMonths)
router.get("/admin", [verifyAccessToken, isAdmin], ctrls.getOrders)
router.get("/", verifyAccessToken, ctrls.getUserOrder)

router.put("/status", [verifyAccessToken, isAdmin], ctrls.updateStatus)


module.exports = router
