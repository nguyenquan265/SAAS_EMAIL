import { Router } from 'express'
import { POST } from '../controllers/clerk.controller'

const router = Router()

router.route('/webhook').post(POST)

export default router
