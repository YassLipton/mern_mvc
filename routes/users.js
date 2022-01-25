const router = require('express').Router()

const userController = require('../controllers/user')

const validateToken = require('../authentication/validateToken')

router.get('/', userController.list)
router.get('/details/:_id', userController.details)
router.post('/create', userController.create)
router.get('/createDefault', userController.createDefault)
router.put('/update/:_id', userController.update)
router.delete('/delete/:_id', userController.delete)
router.post('/login', userController.login)
router.delete('/logout', userController.logout)
router.get('/checkToken/:token', validateToken, userController.checkToken)

module.exports = router