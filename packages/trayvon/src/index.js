import freesewing from "freesewing";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftInterfacingTip from "./interfacingtip";
import draftInterfacingTail from "./interfacingtail";
import draftFabricTip from "./fabrictip";
import draftFabricTail from "./fabrictail";
import draftLiningTip from "./liningtip";
import draftLiningTail from "./liningtail";
import draftLoop from "./loop";

// Create pattern
const Trayvon = freesewing.create(config, plugins);

// Per-part draft methods
Trayvon.prototype.draftInterfacingTip = part => draftInterfacingTip(part);
Trayvon.prototype.draftInterfacingTail = part => draftInterfacingTail(part);
Trayvon.prototype.draftFabricTip = part => draftFabricTip(part);
Trayvon.prototype.draftFabricTail = part => draftFabricTail(part);
Trayvon.prototype.draftLiningTip = part => draftLiningTip(part);
Trayvon.prototype.draftLiningTail = part => draftLiningTail(part);
Trayvon.prototype.draftLoop = part => draftLoop(part);

export default Trayvon;
