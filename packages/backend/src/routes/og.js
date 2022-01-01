import Controller from "../controllers/og";

// Note: Og = Open graph. See https://ogp.me/
const Og = new Controller();

export default (app, passport) => {

  // Load open graph image (requires no authentication)
  app.get("/og-img/:lang/:site/*", Og.image);

}
