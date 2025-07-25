const { parseAndEvaluate } = require("./parser");

const testCases = [
  { expr: "1 + 2 = 3", expected: true },
  { expr: "6 < 10 / 2 + 1", expected: false },
  { expr: "12 + 3 != 4 / 2 + 5", expected: true },
  { expr: "1 >= 1", expected: true },
  { expr: "4 <= 2", expected: false },
  { expr: "(2 + 3) * 2 = 10", expected: true },
  { expr: "2 + 3 * 2 = 10", expected: false },
  { expr: "2 * (3 + 4) != 14", expected: false },
  { expr: "((3 + 7) * 2 - 4) = ( 2 * 10 - (4 / 2 + 2) )", expected: true },
  {
    expr: "(((8 + 4) * 2) - (3 * (2 + 1))) >= ((10 + 2) * (2 + 1) - 6 / 3)",
    expected: false,
  },
  {
    expr: "((3 + 7.5) * (2 + 1) - (6 / 3 + 2)) != (((4 + 2) * 2) + (5 - 1))",
    expected: true,
  },
];

describe("parseAndEvaluate expressions", () => {
  testCases.forEach(({ expr, expected }) => {
    test(`Expression: ${expr}`, () => {
      const { result } = parseAndEvaluate(expr);
      console.log(`Expression: ${expr}, Result: ${result}`);
      expect(result).toBe(expected);
    });
  });
});
