const Router = require('express')
const router = new Router
const dishTypeController = require('../controllers/dishTypeController')
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware')

router.delete('/', dishTypeController.deleteOne);
router.post('/create', /* checkRoleMiddleware('ADMIN'),  */dishTypeController.createNew)
router.get('/', dishTypeController.getAll) 

module.exports = router