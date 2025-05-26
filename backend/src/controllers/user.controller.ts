import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service";
import { StatusCode } from "../utils/constants/status-code.constant";
import { HttpError } from "../utils/customErrors";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();

    return res.succeed(users, {
      message: "Successfully Retrieved Users",
      code: StatusCode.OK,
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.params.id);

    if (!user) {
      throw new HttpError("Failed to retrieve User", StatusCode.NOT_FOUND);
    }

    return res.succeed(user, {
      message: "Successfully Retrieved User",
      code: StatusCode.OK,
    });
  } catch (err) {
    next(err);
  }
};
