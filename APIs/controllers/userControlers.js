const { db } = require("../models");
const { Op } = require("sequelize");
const Joi = require("joi");
const helper = require("../utils/helper");

exports.signup = async (req, res) => {
  try {
    const validatonSchems = Joi.object()
      .required()
      .keys({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required().min(10).max(10),
        password: Joi.string().required(),
      });
    helper.dataValidator(validatonSchems, req?.body);
    const { email, phone, password } = req?.body;
    const isPhoneEmailExist = await db?.User?.findOne({
      where: {
        [Op.or]: [{ email }, { phone }],
      },
      raw: true,
      nest: true,
    });
    if (isPhoneEmailExist) {
      if (isPhoneEmailExist?.email === email) throw "Email already exist";
      if (isPhoneEmailExist?.phone === phone) throw "Phone already exist";
    }
    req.body.password = await helper.hashPassword(password);
    await db?.User.create(req?.body);
    return helper.success(res, {}, "Signup succesfully");
  } catch (err) {
    console.log("API error :-", err);
    return helper.failed(res, err);
  }
};
exports.login = async (req, res) => {
  try {
    const validatonSchems = Joi.object().required().keys({
      loginID: Joi.string().required(),
      password: Joi.string().required(),
    });
    helper.dataValidator(validatonSchems, req?.body);
    const { loginID, password } = req?.body;
    const isUserExist = await db?.User?.findOne({
      where: {
        [Op.or]: [{ email: loginID }, { phone: loginID }],
      },
      raw: true,
      nest: true,
    });
    if (!isUserExist) throw "Invailed login details";
    const isValedPassword = await helper.comparePasswordHash(
      password,
      isUserExist?.password
    );
    if (!isValedPassword) throw "Password not matched";
    const authToken = helper.generateJWTToken({ id: isUserExist?.id });
    isUserExist.authToken = authToken;
    return helper.success(res, isUserExist, "Login succesfully");
  } catch (err) {
    console.log("API error :-", err);
    return helper.failed(res, err);
  }
};
