import { NextFunction, Request, Response } from 'express'
import asyncHandler from '../utils/asyncHandler'

export const getAurinkoUrl = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const params = new URLSearchParams({
    clientId: process.env.AURINKO_CLIENT_ID as string,
    serviceType: req.params.serviceType,
    scopes: 'Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.all',
    responseType: 'code',
    returnUrl: `${process.env.SERVER_URL}/api/v1/aurinko/callback`
  })

  res.status(200).json(`https://api.aurinko.io/v1/auth/authorize?${params.toString()}`)
})

export const GET = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {})

export const POST = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {})
