import { Router } from 'express'
import clerkRouter from './clerk.routes'

const router = Router()

router.use('/clerk', clerkRouter)

export default router
