import express from "express";
import mongoose from "mongoose";
import chalk from "chalk";
import passport from "passport";
import config from "./config";
import expressMiddleware from "./middleware/express";
import passportMiddleware from "./middleware/passport";
import routes from "./routes";

const app = express();

// Load Express middleware
for (let type of Object.keys(expressMiddleware)) expressMiddleware[type](app);

// Load Passport middleware
for (let type of Object.keys(passportMiddleware)) passportMiddleware[type](passport);

// Load routes
for (let type of Object.keys(routes)) routes[type](app, passport);

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
    console.error('Error occured', err);
  }

  if (__DEV__) {
    // webpack flags!
    console.log("> in development");
  }

  console.log(`> listening on port ${port}`);
});
