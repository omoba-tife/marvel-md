const pairNumber = "2348135483096";

const accNumber = "8135483096";

const name = "Tife";

const bankName = "OPAY";

const any = "𓃠";

const emoji = "☠️";

module.exports = { pairNumber, accNumber, bankName, name, any, emoji };

const fs = require("fs");
const { color } = require("./lib/color");
const chalk = require("chalk");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
