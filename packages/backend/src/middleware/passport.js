import jwt from "passport-jwt";
import config from "../config";

const options = {
  jwtFromRequest: jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  ...config.jwt
}

export default (app) => {
  app.use(new jwt.Strategy(options));
}
