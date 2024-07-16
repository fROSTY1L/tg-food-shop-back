const Router = require('express')
const router = new Router
const userRouter = require('./userRouter')
const dishRouter = require('./dishRouter')
const dishTypeRouter = require('./dishTypeRouter')


router.use('/user', userRouter)
router.use('/dish', dishRouter)
router.use('/dishType', dishTypeRouter)


module.exports = router