import { userValidationSchema } from "../user/user.validation.js";

const validateReqBody = (validationSchema) => {
  return async (req, res, next) => {
    try {
      const validatedData = await validationSchema.validate(req.body);
      req.body = validatedData;

      next();
    } catch (error) {
      return res.status(400).send(error.message);
    }
  };
};

export default validateReqBody;
