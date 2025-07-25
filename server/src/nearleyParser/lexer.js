const moo = require("moo");

const lexer = moo.compile({
  WS: { match: /[ \t\n\r]+/, lineBreaks: true },
  number: /[0-9]+(?:\.[0-9]+)?/,
  plus: "+",
  minus: "-",
  times: "*",
  divide: "/",
  lparen: "(",
  rparen: ")",
  eq: "=",
  neq: "!=",
  lte: "<=",
  gte: ">=",
  lt: "<",
  gt: ">",
});

module.exports = lexer;
