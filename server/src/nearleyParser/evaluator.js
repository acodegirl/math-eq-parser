/**
 * Recursively evaluate the given AST node and return its computed value.
 * Supports numbers, binary arithmetic operations, and comparison operations.
 * @param {object} ast - Abstract Syntax Tree node representing an expression
 * @returns {number|boolean} - Result of evaluating the expression
 */
function evaluate(ast) {
  switch (ast.type) {
    case "number":
      // Base case: a numeric literal node, return its value directly
      return ast.value;

    case "binary": {
      const left = evaluate(ast.left);
      const right = evaluate(ast.right);

      // Perform arithmetic operation based on the operator
      switch (ast.operator) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "*":
          return left * right;
        case "/":
          return left / right;
        default:
          throw new Error(`Unknown binary operator: ${ast.operator}`);
      }
    }

    case "comparison": {
      const left = evaluate(ast.left);
      const right = evaluate(ast.right);

      // Perform comparison based on the operator, return boolean result
      switch (ast.operator) {
        case "=":
          return left === right;
        case "!=":
          return left !== right;
        case "<":
          return left < right;
        case ">":
          return left > right;
        case "<=":
          return left <= right;
        case ">=":
          return left >= right;
        default:
          throw new Error(`Unknown comparison operator: ${ast.operator}`);
      }
    }

    default:
      // If AST node type is unrecognized, throw an error
      throw new Error(`Unknown AST node: ${ast.type}`);
  }
}

module.exports = evaluate;
