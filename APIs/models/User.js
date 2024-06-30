const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const model = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      socketId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      isOnline: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
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
      tableName: "User",
      timestamps: true,
    }
  );
  model.sync();
  return model;
};
