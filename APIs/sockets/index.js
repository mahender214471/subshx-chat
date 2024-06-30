const { Server } = require("socket.io");
const controllers = require("./controllers");
const http = require('http');
module.exports = (httpServer) => {
  const io = new Server(httpServer, { cors: { origin: "*" } });
  io.use((socket, next) => controllers.authConnection(io, socket, next));
  io.on("connection", (socket) => {
    controllers.handdleDuplicateConnection(io, socket);
    controllers.handdleUserConnect(io, socket);
    socket.on("send-message", (data) => controllers.sendMessage(io, socket, data));
    socket.on("chats", (data) => controllers.getChatListing(io, socket, data));
    socket.on("get-message-listing", (data) => controllers.getMessageListig(io, socket, data))
    socket.on("disconnect", (data) => controllers.disconnectUser(io, socket, data))
  });
};
