import { useState } from "react";
import { processMathExp } from "../../api/parserApi";
import ResultDisplay from "../ResultDisplay";
import { styles } from "./ParserInput.styles";

const ParserInput = () => {
  const [expression, setExpression] = useState("");
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResultData(null);

    const response = await processMathExp(expression);
    setLoading(false);
    setResultData(response);
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2
          style={{ color: "#333", marginBottom: "24px", textAlign: "center" }}
        >
          Mathematical Equation Parser
        </h2>
        <form onSubmit={handleSubmit} style={styles.form} noValidate>
          <label htmlFor="expression-input" style={styles.label}>
            Enter your mathematical expression:
          </label>
          <input
            id="expression-input"
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g. 2 * (3 + 4) != 14"
            style={{
              ...styles.input,
              ...(inputFocused ? styles.inputFocus : {}),
            }}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            required
          />
          <div style={styles.buttonWrapper}>
            <button
              type="submit"
              disabled={loading}
              style={styles.button(loading)}
              aria-busy={loading}
            >
              {loading ? "Validating..." : "Validate"}
            </button>
          </div>
        </form>
        {resultData && <ResultDisplay resultData={resultData} />}
      </div>
    </div>
  );
};

export default ParserInput;
