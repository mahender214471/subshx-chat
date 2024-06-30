const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const model = sequelize.define(
    "GroupChat",
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
        allowNull: true,
        defaultValue: "",
      },
      groupAdmin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lastMessage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
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
      tableName: "GroupChat",
      timestamps: true,
    }
  );
  model.associate = (models) => {
    model.belongsTo(models.User, { as: "GroupAdmin", foreignKey: "groupAdmin" });
  };
  model.sync();
  return model;
};
