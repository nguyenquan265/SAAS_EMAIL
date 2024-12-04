import { NextFunction, Request, Response } from 'express'
import ApiError from '../utils/ApiError'
import { AuthObject } from '@clerk/express'

declare module 'express' {
  interface Request {
    auth?: AuthObject
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (!req.auth || !req.auth.userId) {
    next(new ApiError(401, 'You must be logged in to access this resource'))
  }

  next()
}

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    roles.forEach((role) => {
      if (req.auth && !req.auth.has({ permission: `org:${role}` })) {
        next(new ApiError(403, 'You do not have permission to access this resource'))
      }
    })

    next()
  }
}
