const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { databse, user, password, host, dialect } = process?.env;
const sequelize = new Sequelize(databse, user, password, {
  host,
  dialect,
});
const db = {};
const modelsPath = `${path.resolve()}/APIs/models`;
const models = fs.readdirSync(modelsPath);
models.forEach((table) => {
  if (table !== "index.js") {
    const tableName = table?.split(".")[0];
    const tableModel = require(`${modelsPath}/${table}`);
    db[tableName] = tableModel(sequelize);
  }
});
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
const Connectmsql = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = sequelize;
module.exports = {
  Connectmsql,
  db,
};
