import freesewing from "freesewing";
import plugins from "@freesewing/plugin-bundle";
import config from "../config";
// Parts
import draftTop from "./top";

// Create pattern
const Tamiko = freesewing.create(config, plugins);
console.log(config, new Tamiko());
// Part draft method
Tamiko.prototype.draftTop = part => draftTop(part);

export default Tamiko;
