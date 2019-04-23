/*
 * This file was created by create-freesewing-pattern
 *  -> https://github.com/freesewing/create-freesewing-pattern
 *
 * Freesewing documentation:
 *  -> https://beta.freesewing.org/en/docs/developer
 *
 * Freesewing help & advice:
 *  -> https://gitter.im/freesewing/freesewing
 */
import freesewing from "freesewing";
import config from "../config";

/*
 * Our most popular plugins are part of the plugin bundle
 * which is already installed and imported.
 * If you need additional plugins, you should install and
 * import them.
 *
 * A list of all plugins is available at:
 *  -> https://beta.freesewing.org/en/docs/developer/plugins
 */
import plugins from "@freesewing/plugin-bundle";
// import buttons from "@freesewing/plugin-buttons";

/*
 * If you want to extend an existing pattern, you should
 * install it as a dev-dependency, and then import it.
 *
 * A list of all patterns is available at:
 *  -> https://beta.freesewing.org/en/patterns
 */
//import Brian from "@freesewing/brian";

/*
 * It's a best practice to put each pattern part in its own file:
 *  -> https://beta.freesewing.org/en/docs/developer/do
 */
import draftBox from "./box";

/* Create new design*/
const {{name}} = new freesewing.Design(config, [
  plugins,
  //buttons
]);

/*
 * If you want to extend an existing pattern, you should
 * attach those draft methods you need to the design prototype
 * as such:
 */
//{{name}}.prototype.draftBrianBase = function(part) {
//  return new Brian(this.settings).draftBase(part);
//};
//{{name}}.prototype.draftBrianBack = function(part) {
//  return new Brian(this.settings).draftBack(part);
//};
//{{name}}.prototype.draftBrianFront = function(part) {
//  return new Brian(this.settings).draftFront(part);
//};

/*
 * Attach the draft methods of your own parts to the
 * design prototype as such:
 */
{{name}}.prototype.draftBox = draftBox;

// Export your design
export default {{name}};
