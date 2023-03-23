import createError from "http-errors";
import jwt from "jsonwebtoken";

export const CheckToken = (req, res, next) => {
  try {
    const AuthToken = req.headers.authorization;
    if (!AuthToken) {
      next(createError(401, "Access denied"));
      return;
    }
    const token = AuthToken.split(" ")[1];
    console.log(token);
    if (!token) {
      next(createError(401, "Access denied"));
      return;
    }

    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
        next(createError(401, err.message));
        return;
      }
      req.userId = payload.id;
      console.log(req.userId);
      next();
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};
