import aaron from "./patterns/aaron";
import brian from "./patterns/brian";

export default {
  en: {
    ...aaron.en,
    ...brian.en,
  },
  nl: {
    ...aaron.nl,
    ...brian.nl,
  }
};
