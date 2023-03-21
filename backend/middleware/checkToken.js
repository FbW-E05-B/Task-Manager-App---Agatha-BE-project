import createError from "http-errors";
import jwt from "jsonwebtoken";

export const CheckToken = (req, res, next) => {
  try {
    const rawToken = req.headers.authorization;
    if (!rawToken) {
      next(createError(401, "Access denied"));
      return;
    }
    const token = rawToken.split(" ")[1];
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
      next();
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};
