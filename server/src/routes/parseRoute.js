const express = require("express");
const { parseAndEvaluate } = require("../nearleyParser/parser");

const router = express.Router();

router.post("/parse", (req, res) => {
  const { expression } = req.body;

  if (typeof expression !== "string") {
    return res.status(400).json({
      success: false,
      error: "Missing or invalid 'expression' field",
    });
  }

  const result = parseAndEvaluate(expression);
  console.log("result is", result);
  if (!result.success) {
    return res.status(400).json(result); // { success: false, error: ... }
  }
  res.json(result); // { success: true, ast, result }
});

module.exports = router;
