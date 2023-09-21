//index.js es el encargado de arrancar la app
const app = require("./app");
const sequelize = require("./database/database");

const port = 3000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully.",
    );
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

main();
