import { Router } from 'express'
import clerkRouter from './clerk.routes'
import aurinkoRouter from './aurinko.routes'

const router = Router()

router.use('/clerk', clerkRouter)
router.use('/aurinko', aurinkoRouter)

export default router
