const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const model = sequelize.define(
    "Chat",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sender: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recever: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lastMessage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      blockedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
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
      tableName: "Chat",
      timestamps: true,
    }
  );
  model.associate = function (models) {
    model.belongsTo(models.User, { as: "Sender", foreignKey: "sender" });
    model.belongsTo(models.User, { as: "Receiver", foreignKey: "recever" });
    model.belongsTo(models.User, { as: "BlockedBy", foreignKey: "blockedBy" });
  };
  model.sync();
  return model;
};
