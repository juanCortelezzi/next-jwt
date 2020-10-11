import { NextApiResponse, NextApiRequest } from "next";
import validateMiddleware from "../../utils/validate-middleware";
import initMiddleware from "../../utils/init-middleware";
import { body, validationResult } from "express-validator";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

const validateBody = initMiddleware(
  validateMiddleware([body("authToken", "Token must be provided").isJWT()], validationResult)
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(400).json({ msg: "Method not available" });
  }

  await validateBody(req, res);

  jwt.verify(req.body.authToken, process.env.TOKEN_SECRET, (err: JsonWebTokenError) => {
    if (err) {
      res.status(401).json({ msg: err });
    } else {
      res.status(200).json({ msg: "valid Auth" });
    }
  });
}
