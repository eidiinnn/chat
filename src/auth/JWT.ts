import jwt from "jsonwebtoken";

const secret = "a_secret";

export interface tokenObject {
  name: string;
  _id: string;
}

export function generateUserToken(name: string, id: string): string {
  return jwt.sign({ name, _id: id }, secret);
}

export function decodeToken(token: string): tokenObject | null {
  return jwt.decode(token) as tokenObject | null;
}
