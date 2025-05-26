import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.utils";
import { StatusCode } from "../utils/constants/status-code.constant";

const excludedRoutes = [
  "/api/v1/auth/login",
  "/api/v1/auth/register",
  "/api/v1/auth/refresh",
  "/api/v1/users"
];

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (excludedRoutes.includes(req.path)) return next();

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token)
    return next(
      // res.fail("No access token provided", {
      //   code: StatusCode.UNAUTHORIZED,
      // })
    );

  try {
    const decoded = verifyToken(token);
    // req.user = decoded;
    return next();
  } catch (err) {
    return next(new Error("Invalid or expired access token"));
  }
};
