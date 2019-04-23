import freesewing from "freesewing";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftFront from "./front";

// Create new design
const benjamin = new freesewing.Design(config, plugins);

// Attach draft methods to prototype
benjamin.prototype.draftFront = draftFront;

export default benjamin;
