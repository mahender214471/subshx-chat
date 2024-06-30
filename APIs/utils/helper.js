const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.dataValidator = (validationSchema, data) => {
  try {
    const validation = validationSchema.validate(data);
    if (validation.error) {
      let message = validation.error.details[0].message;
      message = message.split(" ");
      message[0] = message[0].split('"')[1];
      let erroeMessage = "";
      message.map((w) => (erroeMessage += ` ${w}`));
      throw erroeMessage.trim()
    }
    return true;
  } catch (err) {
    throw err;
  }
};
exports.generateJWTToken = (data) => {
  const token = jwt.sign(data, process?.env?.JWT_SECRET_KEY);
  return token;
};
exports.validateJWTToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process?.env?.JWT_SECRET_KEY);
    if (!decoded || typeof decoded !== "object" || !decoded?.id)
      throw "Invalied token expired";
    const { id } = decoded;
    const currentUser = await db["User"].findOne({
      where: { id },
      raw: true,
    });
    return currentUser;
  } catch (err) {
    throw err;
  }
};
exports.success = (res, data, message) => {
  return res.status(200).send({
    status: 200,
    message: message ? message : "OK",
    body: data,
  });
};
exports.failed = (res, message, statusCode, data) => {
  return res.status(statusCode ? statusCode : 400).send({
    status: statusCode ? statusCode : 400,
    message: message ? message : "Bad request",
    body: data ? data : {},
  });
};

exports.hashPassword = async (pasword) => {
  const hash = await bcrypt.hash(pasword, 12);
  return hash;
};
exports.comparePasswordHash = async (planePassword, hash) => {
  try {
    const result = await bcrypt.compare(planePassword, hash);
    if (result) return true;
    else return false;
  } catch (err) {
    return false;
  }
};
