import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = "a_secret";

export interface tokenObject {
  name: string;
  _id: string;
}

export function generateUserToken(data: tokenObject): string {
  const { name, _id } = data;
  const token = jwt.sign({ name, _id }, secret);
  return `Bearer ${token}`;
}

export function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  jwt.verify(token || "", secret, (err, data) => {
    if (err) return res.send(401);
    req.body.userInfos = data as tokenObject;
    next();
  });
}
