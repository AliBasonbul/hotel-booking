import Express from 'express'
import userController from '../controllers/userController'
const router = Express.Router()

router.post("/register", userController.register)
router.post('/login',userController.login)

export default router;