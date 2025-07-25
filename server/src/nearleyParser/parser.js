const nearley = require("nearley");
const grammar = require("./grammar");
const evaluate = require("./evaluator");

/**
 * Parse an expression string to AST and evaluate it
 * @param {string} input - The expression to evaluate
 * @returns {Object} - { success, ast, result } or { success: false, error }
 */
function parseAndEvaluate(input) {
  try {
    const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
    parser.feed(input);

    if (parser.results.length === 0) {
      return {
        success: false,
        error: "Syntax error: incomplete or ambiguous expression.",
      };
    }

    const ast = parser.results[0];
    const result = evaluate(ast);
    return { success: true, ast, result };
  } catch (err) {
    console.log("Parser error:", err);

    // If Moo lexer produces a token, use it
    if (err?.token?.text && typeof err?.token?.col === "number") {
      return {
        success: false,
        error: `Unexpected character '${err.token.text}' at column ${
          err.token.col + 1
        }`,
        hint: input,
        pointer: `${" ".repeat(err.token.col)}^`,
      };
    }

    // Fallback: use offset (if available) to show error position
    if (typeof err.offset === "number") {
      const pos = err.offset;
      const char = input[pos] ?? "<end of input>";
      const isInvisible =
        char === " " ? "[space]" : char === "\t" ? "[tab]" : char;

      return {
        success: false,
        error: `Unexpected character '${isInvisible}' at column ${pos + 1}`,
        hint: `${input}\n${" ".repeat(pos)}^`, // input followed by pointer under char
      };
    }

    // Final fallback: generic error
    return {
      success: false,
      error: err.message || "Something went wrong while parsing.",
    };
  }
}

module.exports = {
  parseAndEvaluate,
};
