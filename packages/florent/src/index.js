import freesewing from "freesewing";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftTop from "./top";
import draftSide from "./side";
import draftBrimBottom from "./brimbottom";
import draftBrimTop from "./brimtop";
import draftBrimInterfacing from "./briminterfacing";

// Create new design
const Florent = new freesewing.Design(config, plugins);

// Attachdraft methods to prototype
Florent.prototype.draftTop = draftTop;
Florent.prototype.draftSide = draftSide;
Florent.prototype.draftBrimBottom = draftBrimBottom;
Florent.prototype.draftBrimTop = draftBrimTop;
Florent.prototype.draftBrimInterfacing = draftBrimInterfacing;

export default Florent;
