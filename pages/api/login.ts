import dbConnect from "../../utils/dbConnect";
import { NextApiResponse, NextApiRequest } from "next";
import validateMiddleware from "../../utils/validate-middleware";
import initMiddleware from "../../utils/init-middleware";
import { body, validationResult } from "express-validator";
import UserModel from "../../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const validateBody = initMiddleware(
  validateMiddleware(
    [
      body("email", "Email must be provided").isEmail().withMessage("Email is not an email"),
      body("password", "Password must be provided")
        .isLength({ min: 6, max: 70 })
        .withMessage("Password must be between 6 to 70 characters"),
    ],
    validationResult
  )
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(400).json({ msg: "Method not available" });
  }
  await validateBody(req, res);

  await dbConnect();

  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) return res.status(422).json({ msg: "Incorrect Email" });

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(422).json({ msg: "Incorrect Password" });

  const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
  res.status(200).json({ authToken: token });
}
