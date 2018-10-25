import bodyParser from "body-parser";

export default (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
}
