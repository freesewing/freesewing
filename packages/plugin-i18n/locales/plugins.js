import scalebox from "./plugins/scalebox";
import cutonfold from "./plugins/cutonfold";
import grainline from "./plugins/grainline";

export default {
  en: {
    ...scalebox.en,
    ...cutonfold.en,
    ...grainline.en
  },
  nl: {
    ...scalebox.nl,
    ...cutonfold.nl,
    ...grainline.nl
  }
};
