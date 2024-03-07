import express from "express";
import validateReqBody from "../middleware/validation.middleware.js";
import {
  loginUserValidationSchema,
  userValidationSchema,
} from "./user.validation.js";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/user/register",
  validateReqBody(userValidationSchema),
  async (req, res) => {
    //extract newUser from req.body
    const newUser = req.body;
    //check if email already exist
    const user = await User.findOne({ email: newUser.email });
    //if email exist throw error
    if (user) {
      return res.status(400).send({ message: "email already exist" });
    }
    //hash
    let saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltRounds);
    newUser.password = hashedPassword;
    //create user
    await User.create(newUser);

    //send appropriate response
    return res.status(201).send({ message: "user registered successfully" });
  }
);

router.post("/user/login", async (req, res) => {
  //extract newCredentials from req.body
  const newCredentials = req.body;

  //check for email existance
  const user = await User.findOne({ email: newCredentials.email });

  // if not email exist throw error
  if (!user) {
    return res.status(409).send({ message: "invalid credentials" });
  }
  // compare for password match
  const isPasswordMatched = await bcrypt.compare(
    newCredentials.password,
    user.password
  );
  //if not password match throw error
  if (!isPasswordMatched) {
    return res.status(409).send({ message: "invalid credentials" });
  }
  //login is successfull and give token
  let payload = { userId: user._id };
  const token = jwt.sign(
    payload,
    "7c0a9884a49b007bca2506ba9558a768bfb17ca3c93a7fac38fe31c4e82032e6",
    { expiresIn: "1d" }
  );

  //send appropriate response
  return res
    .status(200)
    .send({ message: "login successfull", token: token, userDetails: user });
});
export default router;
