import freesewing from "@freesewing/core";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftBase from "./base";

// Create new design
const benjamin = new freesewing.Design(config, plugins);

// Attach draft methods to prototype
benjamin.prototype.draftBase = draftBase;

export default benjamin;
