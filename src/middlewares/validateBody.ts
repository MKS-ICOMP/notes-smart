import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

export default function validateBody(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      return res.status(422).json({
        message: 'Validation error',
        details: error.details.map((detail) => detail.message),
      });
    }

    req.body = value;
    next();
  };
}
