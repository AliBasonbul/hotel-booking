import express from 'express'
import userRoute from './userRoute'
import bookingRoute from './bookingRoute'
import roomRoute from './roomRoute'

const router = express.Router()

router.use('/user',userRoute)
router.use('/booking',bookingRoute)
router.use('/rooms',roomRoute)

export default router;