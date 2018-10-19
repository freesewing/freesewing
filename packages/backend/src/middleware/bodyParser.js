import bodyParser from "body-parser";

export default (app) => {
  // application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // application/json
  app.use(bodyParser.json());
}
