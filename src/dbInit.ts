import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: false,
});

export const Contribution = require("./models/Contribution")(sequelize);

sequelize.sync();
