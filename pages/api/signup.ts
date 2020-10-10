import dbConnect from "../../utils/dbConnect";
import { NextApiResponse, NextApiRequest } from "next";
import UserModel from "../../models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(400).end();
  }
  await dbConnect();

  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const saved_user = await user.save();
    res.status(200).json(saved_user);
  } catch (err) {
    res.status(400).send(err);
  }
}
