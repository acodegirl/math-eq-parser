const { exec } = require("child_process");
const path = require("path");

const inputFile = path.resolve(__dirname, "grammar.ne");
const outputFile = path.resolve(__dirname, "grammar.js");

exec(
  // Command to compile grammar.ne to grammar.js
  `npx nearleyc "${inputFile}" -o "${outputFile}"`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Compilation failed: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Compiler warnings:\n${stderr}`);
    }
    console.log(`Grammar compiled successfully to ${outputFile}`);
  }
);
