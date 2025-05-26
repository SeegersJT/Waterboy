import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/customErrors';
import { StatusCode } from '../utils/constants/status-code.constant';

const errorHandlingMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    return res.fail(null, { message: err.message, code: err.code });
  }

  return res.fail(err, {
    message: 'Internal Server Error',
    code: StatusCode.INTERNAL_SERVER_ERROR,
  });

};

export default errorHandlingMiddleware;
