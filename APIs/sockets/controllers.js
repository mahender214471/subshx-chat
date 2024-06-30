const { db } = require("../models");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const helper = require("../utils/helper");
const { Op, Utils } = require("sequelize");
const Joi = require("joi");
const session = {};
const errorNotifyer = (io, socket, err) => {
  const socketId = socket.id;
  if (err) {
    if (typeof err === "string") {
      if (err === "Unauthorization") {
        err = "error_message:Unauthorized invailed authorization token";
      }
    } else if (typeof err === "object") {
      err.message ? (err = err?.message) : err;
    } else err = "Connection refused";
  } else err = "Connection refused";
  io.to(socketId).emit("errorNotifyer", { message: err });
  //socket.disconnect();
};
exports.authConnection = async (io, socket, next) => {
  try {
    const sendError = (message) => {
      !message ? (message = "Unauthorized") : message;
      throw message;
    };
    if (!socket.handshake) sendError();
    if (!socket.handshake.headers) sendError();
    if (!socket.handshake.headers.authorization) sendError();
    const authToken = socket.handshake.headers.authorization;
    const jwtSecretToken = process.env.JWT_SECRET_KEY;
    const decoded = jwt.verify(authToken, jwtSecretToken);
    const currentUser = await db["User"].findOne({
      where: { id: decoded?.id },
      raw: true,
    });
    if (!currentUser) sendError();
    socket.userData = currentUser;
    next();
  } catch (err) {
    console.log("err : -", err);
    next(new Error(err));
  }
};
(exports.handdleDuplicateConnection = async (io, socket) => {
  const id = socket?.userData?.id;
  if (session[id]) {
    session[id]?.disconnect(true);
    session[id] = socket;
  } else {
    session[id] = socket;
  }
}),
  (exports.handdleUserConnect = async (io, socket) => {
    try {
      const socketId = socket.id;
      const id = socket?.userData?.id;
      await db["User"].update({ socketId, isOnline: 1 }, { where: { id } });
      // const userGroups = await db?.GroupMember.findAll({
      //   where: {
      //     userId: id,
      //   },
      //   // include: {
      //   //   model: db?.GroupChat,
      //   //   as: "Group",
      //   // },
      //   raw: true,
      //   nest: true,
      // });
      io.to(socketId).emit("connectListenerr", {
        message: "User connected succesfully",
      });
    } catch (error) {
      console.log("error==================>", error);
      errorNotifyer(io, socket, err);
    }
  });
exports.disconnectUser = async (io, socket, data) => {
  try {
    const id = socket?.userData?.id;
    await db["User"].update({ isOnline: 0 }, { where: { id } });
  } catch (err) {
    errorNotifyer(io, socket, err);
  }
};
exports.sendMessage = async (io, socket, data) => {
  try {
    const validationSchem = joi
      .object()
      .required()
      .keys({
        receverId: joi.number(),
        groupId: joi.number(),
        message: joi.string().required(),
        messageType: joi.number().required().valid(1, 2),
      });
    helper.dataValidator(validationSchem, data);
    const { receverId, groupId, message, messageType } = data;
    if (!groupId && !receverId) throw "groupId or receverId required";
    const senderId = socket?.userData?.id;
    const socketId = socket?.id;
    if (receverId) {
      const receverDetails = await db["User"].findOne({
        where: { id: receverId },
        attributes: ["id", "isOnline", "socketId", "name"],
        raw: true,
        nest: true,
      });
      if (!receverDetails) throw "Invalied receverId";
      if (senderId === parseInt(receverId)) throw "Invalied receverId";
      let chatId = null;
      const isChatExist = await db["Chat"].findOne({
        where: {
          [Op.or]: [
            { sender: senderId, recever: receverId },
            { recever: senderId, sender: receverId },
          ],
        },
        raw: true,
      });
      if (!isChatExist) {
        const newChat = await db["Chat"].create({
          sender: senderId,
          recever: receverId,
        });
        chatId = newChat.id;
      } else chatId = isChatExist?.id;
      await db["Chat"].update(
        {
          lastMessage: message,
        },
        { where: { id: chatId } }
      );
      const newMessage = await db["Message"].create({
        chatId,
        senderId,
        receverId,
        message,
        messageType,
      });
      io.to(socketId).emit("send-message-status", {
        status: 200,
        message: "Message sended succesfully",
      });
      if (receverDetails?.isOnline === 1) {
        io.to(receverDetails?.socketId).emit("receve-message", newMessage);
      }
    }
  } catch (err) {
    console.log("err =============>", err);
    errorNotifyer(io, socket, err);
  }
};
exports.getChatListing = async (io, socket, data) => {
  try {
    const socketId = socket?.id;
    const userId = socket?.userData?.id;
    const chats = await db["Chat"].findAll({
      where: {
        [Op.or]: [{ sender: userId }, { recever: userId }],
      },
      include: [
        {
          model: db["User"],
          as: "Sender",
          attributes: ["id", "name", "image", "isOnline"],
        },
        {
          model: db["User"],
          as: "Receiver",
          attributes: ["id", "name", "image", "isOnline"],
        },
      ],
      raw: true,
      nest: true,
    });
    const finalChats = [];
    for (let i = 0; i < chats.length; i++) {
      const { id, Sender, Receiver, lastMessage, updatedAt } = chats[i];
      const chatData = {
        chatId: id,
        lastMessage,
        sender: {},
        recever: {},
        date: updatedAt,
      };
      if (Sender?.id == userId) {
        chatData.recever = Receiver;
        chatData.sender = Sender;
      } else {
        chatData.recever = Sender;
        chatData.sender = Receiver;
      }
      finalChats.push(chatData);
    }
    io.to(socketId).emit("chats-list", finalChats);
  } catch (err) {
    errorNotifyer(io, socket, err);
  }
};
exports.getMessageListig = async (io, socket, data) => {
  try {
    const validationSchema = Joi.object().required().keys({
      chatId: Joi.number().required(),
    });
    helper.dataValidator(validationSchema, data);
    const socketId = socket?.id;
    const userId = socket?.userData?.id;
    const { chatId } = data;

    const messageListing = await db["Message"].findAll({
      where: { chatId },
      include: [
        {
          model: db["User"],
          as: "Sender",
          attributes: ["id", "name", "image"],
        },
        {
          model: db["User"],
          as: "Recever",
          attributes: ["id", "name", "image"],
        },
      ],
      raw: true,
      nest: true,
    });
    const finalList = [];
    for (let i = 0; i < messageListing.length; i++) {
      const { id, messageType, createdAt, Sender, Recever, message } =
        messageListing[i];
      const messageData = {
        id,
        messageType,
        createdAt,
        message,
        user: {},
        type: 1, // 1 for sended 2 for receved
      };
      if (Sender?.id == userId) {
        messageData.user = Sender;
      } else {
        messageData.user = Sender;
        messageData.type = 2;
      }
      finalList.push(messageData);
    }
    io.to(socketId).emit("get-message-listing-status", finalList);
  } catch (err) {
    errorNotifyer(io, socket, err);
  }
};
