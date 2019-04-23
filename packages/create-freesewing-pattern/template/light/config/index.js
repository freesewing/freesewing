import { version } from "../package.json";

// Configuration file syntax documentation:
// -> https://beta.freesewing.org/en/docs/developer/config

export default {
  name: "{{name}}",
  version,

  //
  // measurements
  //
  // An array with the names of
  // the measurements required for your design
  measurements: [
    //"chestCircumference",
    //"naturalWaist",
  ],

  //
  // dependencies
  //
  // An object where the key must be a part name, the value can be:
  //  -> a part name
  //  -> an array of part names
  //
  // This will be used to determine the order in which parts are drafted
  dependencies: {
    //front: "back"
    //side: ["front", "back"]
  },

  //
  // inject
  //
  // An object where both key and value must be a a part name.
  // The value part will be injected in the key part.
  //
  // By injected we mean rather than starting out with a fresh part,
  // the key part will get  the points, paths, and snippets of the value part.
  inject: {
    //front: "back"
  },

  //
  // hide
  //
  // An array that lists pattern parts that should be hidden
  // by default. Hidden means that they will be drafted,
  // but not rendered. Typically used for a base part on
  // which other parts are built.
  //
  hide: [],

  //
  // parts
  //
  // An array that lists your (additional) pattern parts.
  // The name must be the key the pattern.parts object.
  //
  // This does not need to be an exhaustive list of all parts
  // in your pattern. If parts are included in the dependencies,
  // inject, or hide configuration, there’s no need to include
  // them here, as we already know of their existence.
  //
  parts: [],

  //
  // options
  //
  // Options come in 6 varities:
  //
  //  -> Constants : A value that can’t be changed
  //  -> Percentages : A value in percent, with minimum and maximum values
  //  -> Millimeters : A value in millimeter, with minimum and maximum values
  //  -> Degrees : A value in degrees, with minimum and maximum values
  //  -> Counters : An integer value, with minimum and maximum values
  //  -> Lists : A list of options with a default
  //
  // Under the hood, millimeters, degrees, and counters are handled
  // the same way. We use different types because it easier to
  // understand the nature of a given option.
  //
  options: {
    //
    // Constants
    //
    // If your option is a scalar value (like a string or a number),
    // it will be treated as a constant.
    //
    // Rather than define constants in your code, it’s good practice
    // to set them in your configuration file. This way, people who
    // extend your pattern can change them if they would like to.
    //
    //foo: 4,

    //
    // Percentages
    //
    // Percentage options are the bread and butter of freesewing.
    // Almost all your options will probably be percentages.
    // They make sure that your pattern will scale regardless of size.
    //
    // Your percentage option should be an object with these properties:
    //
    //  -> pct : The percentage
    //  -> min : The minimum that’s allowed
    //  -> max : The maximum that’s allowed
    //
    //  Percentage options will be divided by 100 when loaded
    //
    //  You specify percentages in your config file.
    //  For example, 50 means 50%. When your configuration is loaded,
    //  those percentages will by divided by 100.
    //  So a percentage of 50 in your config file will be 0.5 when
    //  you read out that option in your pattern.
    //
    //chestEase: {
    //  pct: 8,
    //  min: -4,
    //  max: 20
    //},

    //
    // Millimeters
    //
    // While we recommend using percentages where possible, sometimes
    // that doesn’t make sense. For those cases, you can use millimeters.
    //
    // Your millimeter option should be an object with these properties:
    //
    //  -> mm : The default value in millimeter
    //  -> min : The minimul that’s allowed
    //  -> max : The maximum that’s allowed
    //
    //elasticWidth: {
    //  mm: 35,
    //  min: 5,
    //  max: 80
    //},

    //
    // Degrees
    //
    // For angles, use degrees.
    //
    // Your degree option should be an object with these properties:
    //
    //  -> deg : The default value in degrees
    //  -> min : The minimul that’s allowed
    //  -> max : The maximum that’s allowed
    //
    //collarAngle: {
    //  deg: 85,
    //  min: 60,
    //  max: 130
    //},

    //
    // Counters
    //
    // For a given number of things, use counters.  Counters are
    // for integers only. Things like number of buttons and so on.
    //
    // Your counter option should be an object with these properties:
    //
    //  -> count : The default integer value
    //  -> min : The minimal integer value that’s allowed
    //  -> max : The maximum integer value that’s allowed
    //
    //butttons: {
    //  count: 7,
    //  min: 4,
    //  max: 12
    //},

    //
    // Lists
    //
    // Use a list option when you want to offer an array of choices.
    //
    // Your list option should be an object with these properties:
    //
    //  -> dflt : The default for this option
    //  -> list : An array of available values options
    //
    //cuffStyle: {
    //  dflt: "angledBarrelCuff",
    //  list: [
    //    "roundedBarrelCuff",
    //    "angledBarrelCuff",
    //    "straightBarrelCuff",
    //    "roundedFrenchCuff",
    //    "angledFrenchCuff",
    //    "straightFrenchCuff"
    //  ]
    //}
  }
};
