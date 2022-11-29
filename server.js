require("dotenv").config();

const { createApp } = require("./app");
const { database } = require("./src/models/dataSource");

const startServer = async () => {
  const app = createApp();
  const PORT = process.env.PORT;

  await database
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error occurred during Data Source initialization", err);
      database.destroy();
    });

  app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}`);
  });
};

startServer();
