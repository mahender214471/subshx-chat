const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const model = sequelize.define(
    "Message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      chatId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      GroupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      senderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      receverId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      messageType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        comment: "1 for chat , 2 for group chat",
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "createdAt",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: "updatedAt",
      },
    },
    {
      tableName: "Message",
      timestamps: true,
    }
  );
  model.associate = (models) => {
    model.belongsTo(models.Chat, { as: "chat", foreignKey: "chatId" });
    model.belongsTo(models.GroupChat, { as: "Group", foreignKey: "GroupId" });
    model.belongsTo(models.User, { as: "Sender", foreignKey: "senderId" });
    model.belongsTo(models.User, { as: "Recever", foreignKey: "receverId" });


  };
  model.sync();
  return model;
};
