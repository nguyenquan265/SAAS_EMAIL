import { Router } from 'express'
import { GET, POST, getAurinkoUrl } from '../controllers/aurinko.controller'
import { clerkMiddleware } from '@clerk/express'
import { authenticate } from '../middlewares/auth.middleware'

const router = Router()

router.route('/callback').get(clerkMiddleware(), authenticate, GET)
router.route('/webhook').post(POST)
router.route('/:serviceType').get(clerkMiddleware(), authenticate, getAurinkoUrl)

export default router
