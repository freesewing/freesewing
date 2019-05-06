import freesewing from "@freesewing/core";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftColors from "./colors";

// Create design
const Pattern = new freesewing.Design(config, plugins);

// Attach draft methods to prototype
Pattern.prototype.draftColors = part => draftColors(part);

export default Pattern;
