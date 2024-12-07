import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'
import { Webhook, WebhookRequiredHeaders } from 'svix'
import { IncomingHttpHeaders } from 'http'
import ApiError from '../utils/ApiError'
import prisma from '../config/prisma'

type EventType = 'user.created'

type Event = {
  data: Record<string, string | number | Record<string, string>[]>
  object: 'event'
  type: EventType
}

export const POST = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const payload = req.body
  const header = req.headers

  const heads = {
    'svix-id': header['svix-id'],
    'svix-timestamp': header['svix-timestamp'],
    'svix-signature': header['svix-signature']
  }

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '')

  let evnt: Event | null = null

  evnt = wh.verify(JSON.stringify(payload), heads as IncomingHttpHeaders & WebhookRequiredHeaders) as Event

  if (!evnt) {
    throw new ApiError(400, 'Invalid webhook signature')
  }

  const eventType: EventType = evnt?.type!

  if (eventType === 'user.created') {
    const id = evnt?.data.id as string
    const firstName = evnt?.data.first_name as string
    const lastName = evnt?.data.last_name as string
    const imageUrl = evnt?.data.image_url as string
    //@ts-ignore
    const email = evnt?.data.email_addresses[0].email_address as string

    await prisma.user.upsert({
      where: { id },
      update: { email, firstName, lastName, imageUrl },
      create: { id, email, firstName, lastName, imageUrl }
    })
  }

  res.status(400).json({ message: 'Invalid event type' })
})
