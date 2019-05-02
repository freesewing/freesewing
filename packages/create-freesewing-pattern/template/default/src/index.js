import freesewing from "@freesewing/core";
import plugins from "@freesewing/plugins";
import config from "../config";
import draftBox from "./box";

// Create new design
const Pattern = new freesewing.Design(config, plugins);

// Attach the draft methods to the prototype
Pattern.prototype.draftBox = draftBox;

export default Pattern;
