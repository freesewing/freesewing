import freesewing from "@freesewing/core";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftSkirt from "./skirt";

// Create design
const Pattern = new freesewing.Design(config, plugins);

// Attach draft methods to prototype
Pattern.prototype.draftSkirt = part => draftSkirt(part);

export default Pattern;
