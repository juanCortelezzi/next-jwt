import dbConnect from "../../utils/dbConnect";
import { NextApiResponse, NextApiRequest } from "next";
import validateMiddleware from "../../utils/validate-middleware";
import initMiddleware from "../../utils/init-middleware";
import { body, validationResult } from "express-validator";
import UserModel from "../../models/user";
import bcrypt from "bcryptjs";

const validateBody = initMiddleware(
  validateMiddleware(
    [
      body("name", "Name must be provided")
        .isLength({ min: 6, max: 70 })
        .withMessage("Name must be between 6 to 70 characters"),
      body("email", "Email must be provided").isEmail().withMessage("Not an email"),
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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  await dbConnect();

  const emailExists = await UserModel.findOne({ email: req.body.email });
  if (emailExists) return res.status(422).json({ msg: "Email already in use" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    await user.save();
    res.status(200).json({ msg: "User created" });
  } catch (err) {
    res.status(500).json({ msg: "Something went wrong", err });
  }
}
