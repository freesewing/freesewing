import account from "./account.yaml";
import app from "./app.yaml";
import email from "./email.yaml";
import errors from "./errors.yaml";
import filter from "./filter.yml";
import gdpr from "./gdpr.yaml";
import i18n from "./i18n.yaml";
import measurements from "./measurements.yaml";

const topics = {
  account,
  app,
  email,
  errors,
  filter,
  gdpr,
  i18n,
  measurements
};

const strings = {};

for (let topic of Object.keys(topics)) {
  for (let id of Object.keys(topics[topic])) {
    if (typeof topics[topic][id] === "string")
      strings[topic + "." + id] = topics[topic][id];
    else {
      for (let key of Object.keys(topics[topic][id])) {
        if (typeof topics[topic][id][key] === "string")
          strings[topic + "." + id + "." + key] = topics[topic][id][key];
        else console.log("Depth exceeded!");
      }
    }
  }
}

export {
  account,
  app,
  email,
  errors,
  filter,
  gdpr,
  i18n,
  measurements,
  strings
};
