const Router = require('express')
const router = new Router
const dishController = require('../controllers/dishController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.post('/', /* checkRoleMiddleware('ADMIN'),  */dishController.create)
router.get('/', dishController.getAll) 
router.get('/:id', dishController.getOne)
router.delete('/', dishController.deleteOne)

module.exports = router