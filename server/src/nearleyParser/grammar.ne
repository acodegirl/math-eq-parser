@{%
const lexer = require("./lexer");
const pass = x => x[0];
%}

@lexer lexer

# Entry point rule: parses the main expression with optional surrounding whitespace
main -> _ expr _ {% ([, e]) => e %}

# Expression rule: comparison or just arithmetic expression
expr
  -> arith_expr _ comp_op _ arith_expr
     {% ([a, , op, , b]) => ({ type: "comparison", operator: op, left: a, right: b }) %}
  | arith_expr {% pass %}

# Arithmetic expression: handles addition and subtraction (left associative)
arith_expr
  -> arith_expr _ "+" _ term
     {% ([a, , , , b]) => ({ type: "binary", operator: "+", left: a, right: b }) %}
  | arith_expr _ "-" _ term
     {% ([a, , , , b]) => ({ type: "binary", operator: "-", left: a, right: b }) %}
  | term {% pass %}

# Term rule: handles multiplication and division (higher precedence than addition/subtraction)
term
  -> term _ "*" _ factor
     {% ([a, , , , b]) => ({ type: "binary", operator: "*", left: a, right: b }) %}
  | term _ "/" _ factor
     {% ([a, , , , b]) => ({ type: "binary", operator: "/", left: a, right: b }) %}
  | factor {% pass %}

# Factor rule: a parenthesized expression or a number literal
factor
  -> "(" _ expr _ ")" {% ([, , e]) => e %}
  | number {% pass %}

# Number token parsed as a float number node
number -> %number {% ([t]) => ({ type: "number", value: parseFloat(t.value) }) %}

# Comparison operators recognized in the parser
comp_op
  -> %eq  {% () => "=" %}
  | %neq {% () => "!=" %}
  | %lt  {% () => "<" %}
  | %gt  {% () => ">" %}
  | %lte {% () => "<=" %}
  | %gte {% () => ">=" %}

# Whitespace rule: matches zero or more whitespace tokens and is ignored between tokens
_ -> %WS:*
