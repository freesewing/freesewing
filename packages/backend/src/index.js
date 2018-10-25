import express from "express";
import mongoose from "mongoose";
import chalk from "chalk";
import config from "./config";
import middleware from "./middleware";
import routes from "./routes";

const app = express();

// Load middleware
for (let type of Object.keys(middleware)) middleware[type](app);

// Load routes
for (let type of Object.keys(routes)) routes[type](app);

// Connecting to the database
mongoose.Promise = global.Promise;
mongoose
  .connect(
    config.db.uri,
    {
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log(chalk.green("Successfully connected to the database"));
  })
  .catch(err => {
    console.log(
      chalk.red("Could not connect to the database. Exiting now..."),
      err
    );
    process.exit();
  });

app.get("/", async (req, res) => {
  try {
    const thing = await Promise.resolve({ one: "two" }); // async/await!
    return res.json({ ...thing, hello: "world" }); // object-rest-spread!
  } catch (e) {
    return res.json({ error: e.message });
  }
});
const port = process.env.PORT || 3000;

app.listen(port, err => {
  if (err) {
    console.error(err);
  }

  if (__DEV__) {
    // webpack flags!
    console.log("> in development");
  }

  console.log(`> listening on port ${port}`);
});
