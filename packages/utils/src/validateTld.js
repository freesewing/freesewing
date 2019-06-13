import tlds from "tlds";
/** Validates the top level domain (TLT) for an email address */
const validateTld = email => {
  let tld = email
    .split("@")
    .pop()
    .split(".")
    .pop()
    .toLowerCase();
  if (tlds.indexOf(tld) === -1) return tld;
  else return true;
};

export default validateTld;
