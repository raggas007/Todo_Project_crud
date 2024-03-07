import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";

export const isUser = async (req, res, next) => {
  //extract toke from req.headers
  const authorization = req.headers.authorization;
  const splittedValues = authorization?.split(" ");
  const token = splittedValues?.length === 2 ? splittedValues[1] : undefined;

  if (!token) {
    return res.status(401).send({ message: "unauthorized1." });
  }
  let payload;
  try {
    payload = jwt.verify(
      token,
      "7c0a9884a49b007bca2506ba9558a768bfb17ca3c93a7fac38fe31c4e82032e6"
    );
  } catch (error) {
    return res.status(401).send({ message: "unauthorized2." });
  }

  //find user using userid from payload

  const user = User.findOne({ _id: payload.userId });

  if (!user) {
    return res.status(401).send({ message: "unauthorized3." });
  }
  req.loggedInUserId = user._id;

  // call next function
  next();
};
