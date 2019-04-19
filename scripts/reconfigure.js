/* eslint-disable no-console */
const path = require("path");
const fse = require("fs-extra");
const glob = require("glob");
const yaml = require("js-yaml");
const chalk = require("chalk");
const Mustache = require("mustache");
const { version } = require("../lerna.json");

const repoPath = process.cwd();
const config = {
  repoPath,
  defaults: readConfigFile("defaults.yaml"),
  descriptions: readConfigFile("descriptions.yaml"),
  keywords: readConfigFile("keywords.yaml"),
  scripts: readConfigFile("scripts.yaml"),
  dependencies: readConfigFile("dependencies.yaml", { version }),
  exceptions: readConfigFile("exceptions.yaml"),
  templates: {
    pkg: readTemplateFile("package.dflt.json"),
    rollup: readTemplateFile("rollup.config.dflt.js"),
    readme: readTemplateFile("readme.dflt.md")
  }
};
const packages = glob.sync("*", {
  cwd: path.join(config.repoPath, "packages")
});

console.log(config.defaults);
validate(packages, config);
reconfigure(packages, config);

process.exit();

/**
 * Reads a template file, with Mustache replacements if needed
 */
function readTemplateFile(file, replace = false) {
  return fse.readFileSync(
    path.join(repoPath, "config", "templates", file),
    "utf-8"
  );
}

/**
 * Reads a YAML config file, with Mustache replacements if needed
 */
function readConfigFile(file, replace = false) {
  if (replace)
    return yaml.safeLoad(
      Mustache.render(
        fse.readFileSync(path.join(repoPath, "config", file), "utf-8"),
        replace
      )
    );
  return yaml.safeLoad(
    fse.readFileSync(path.join(repoPath, "config", file), "utf-8")
  );
}

/**
 * Figure out what sort of package this is.
 * Returns a string, one of:
 *  - pattern
 *  - plugin
 *  - other
 */
function packageType(pkg, config) {
  if (pkg.substring(0, 7) === "plugin-") return "plugin";
  if (config.descriptions[pkg].substring(0, 21) === "A FreeSewing pattern ")
    return "pattern";
  return "other";
}

/**
 * Returns an array of keywords for a package
 */
function keywords(pkg, config, type) {
  if (typeof config.keywords[pkg] !== "undefined") return config.keywords[pkg];
  if (typeof config.keywords[type] !== "undefined")
    return config.keywords[type];
  else {
    console.log(
      chalk.redBright.bold("Problem:"),
      chalk.redBright(`No keywords for package ${pkg} which is of type ${type}`)
    );
    process.exit();
  }
}

/**
 * Returns an plain object of scripts for a package
 */
function scripts(pkg, config, type) {
  let runScripts = {};
  if (typeof config.scripts._types[type] !== "undefined") {
    for (let key of Object.keys(config.scripts._types[type])) {
      runScripts[key] = Mustache.render(config.scripts._types[type][key], {
        name: pkg
      });
    }
  }
  if (typeof config.scripts[pkg] !== "undefined") {
    for (let key of Object.keys(config.scripts[pkg])) {
      runScripts[key] = Mustache.render(config.scripts[pkg][key], {
        name: pkg
      });
    }
  }

  return runScripts;
}

/**
 * Returns an plain object with the of dependencies for a package
 * section is the key in teh dependencies.yaml fine, one of:
 *
 *  - _ (for dependencies)
 *  - dev (for devDependencies)
 *  - peer (for peerDependencies)
 *
 */
function deps(section, pkg, config, type) {
  let dependencies = {};
  if (
    typeof config.dependencies._types[type] !== "undefined" &&
    typeof config.dependencies._types[type][section] !== "undefined"
  )
    dependencies = config.dependencies._types[type][section];
  if (typeof config.dependencies[pkg] === "undefined") return dependencies;
  if (typeof config.dependencies[pkg][section] !== "undefined")
    return { ...dependencies, ...config.dependencies[pkg][section] };
}

/**
 * These merely call deps() for the relevant dependency section
 */
function dependencies(pkg, config, type) {
  return deps("_", pkg, config, type);
}
function devDependencies(pkg, config, type) {
  return deps("dev", pkg, config, type);
}
function peerDependencies(pkg, config, type) {
  return deps("peer", pkg, config, type);
}

/**
 * Creates a package.json file for a package
 */
function packageConfig(pkg, config) {
  let type = packageType(pkg, config);
  let pkgConf = JSON.parse(
    Mustache.render(config.templates.pkg, {
      name: pkg,
      description: config.descriptions[pkg],
      author: config.defaults.author,
      keywords: keywords(pkg, config, type)
    })
  );
  pkgConf.version = version;
  if (config.exceptions.noNamespace.indexOf(pkg) !== -1) pkgConf.name = pkg;
  else pkgConf.name = `@freesewing/${pkg}`;
  pkgConf.keywords = pkgConf.keywords.concat(keywords(pkg, config, type));
  (pkgConf.scripts = scripts(pkg, config, type)),
    (pkgConf.dependencies = dependencies(pkg, config, type));
  pkgConf.devDependencies = devDependencies(pkg, config, type);
  pkgConf.peerDependencies = peerDependencies(pkg, config, type);

  return pkgConf;
}

/**
 * Make sure we have (at least) a description for each package
 */
function validate(pkgs, config) {
  console.log(chalk.blueBright("Validating package descriptions"));
  for (let pkg of pkgs) {
    if (typeof config.descriptions[pkg] !== "string") {
      console.log(
        chalk.redBright.bold("Problem:"),
        chalk.redBright(`No description for package ${pkg}`)
      );
      process.exit();
    }
  }
  console.log(chalk.yellowBright.bold("Looks good"));

  return true;
}

/**
 * Puts a package.json, rollup.config.js, and README.md
 * into every subdirectory under the packages directory.
 */
function reconfigure(pkgs, config) {
  for (let pkg of pkgs) {
    console.log(chalk.blueBright(`Reconfiguring ${pkg}`));
    fse.writeFileSync(
      path.join(config.repoPath, "packages", pkg, "package.json"),
      JSON.stringify(packageConfig(pkg, config), null, 2) + "\n"
    );
    if (config.exceptions.noRollup.indexOf(pkg) === -1) {
      fse.writeFileSync(
        path.join(config.repoPath, "packages", pkg, "rollup.config.js"),
        config.templates.rollup
      );
    }
  }
  console.log(
    chalk.yellowBright.bold("All done."),
    chalk.yellowBright("Run"),
    chalk.white.bold("lerna bootstrap"),
    chalk.yellowBright("to load new dependencies.")
  );
}
