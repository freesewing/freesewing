import account from "./account.yaml";
import app from "./app.yaml";
import email from "./email.yaml";
import errors from "./errors.yaml";
import gdpr from "./gdpr.yaml";
import i18n from "./i18n.yaml";

const topics = {
  account,
  app,
  email,
  errors,
  gdpr,
  i18n
};

const strings = {};

for (let topic of Object.keys(topics)) {
  for (let id of Object.keys(topics[topic])) {
    strings[topic + "." + id] = topics[topic][id];
  }
}

export { account, app, email, errors, gdpr, i18n };

export default strings;
