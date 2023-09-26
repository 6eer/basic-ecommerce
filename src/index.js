const app = require("./app");
const sequelize = require("./database/database");
require("./models/Country");
require("./models/User");
require("./models/Rol");
require("./models/Seller");
require("./models/Cart");
require("./models/Product");
require("./models/Review");

const port = 3000;

async function main() {
  try {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });

    //{ alter: true }
    await sequelize.authenticate({ alter: true });
    console.log(
      "Connection to the database has been established successfully.",
    );

    await sequelize.sync({ force: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
