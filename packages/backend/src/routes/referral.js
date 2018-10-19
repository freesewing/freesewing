import referral from "../controllers/referral";

export default (app) => {
  // Log referral
  app.post('/referral', referral.create);
}





