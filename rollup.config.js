"use strict";
import chalk from "chalk";
import { defineConfig } from "rollup";
const printCode = (colorize) => ({
  name: "testplugin",
  transform(code, id) {
    if (id.endsWith("sub.js")) {
      console.log(colorize(code));
      console.log();
    }
  }
});
const amendPlugin = (conf2) => {
  return {
    name: "amend",
    transform(code, id) {
      if (id.endsWith("an-amended-file.js")) {
        const lines = code.split("\n");
        const payload = lines[3].replace(/.*return/, "export default");
        const dbPath = conf2.myDb;
        return `
import myDb from '${dbPath}'

${payload}
`;
      }
    }
  };
};
const prodConf = {
  myDb: "./db/prod.js"
};
const devConf = {
  myDb: "./db/dev.js"
};
const useProd = false;
const conf = useProd ? prodConf : devConf;
export default defineConfig({
  input: "./lib/an-amended-file.js",
  plugins: [
    printCode(chalk.blue),
    amendPlugin(conf),
    printCode(chalk.green)
  ]
});
