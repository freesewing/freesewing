import Controller from "../controllers/confirmation";

const Confirmation = new Controller();
export default (app, passport) => {
  app.post('/confirm', Confirmation.confirm);
}
