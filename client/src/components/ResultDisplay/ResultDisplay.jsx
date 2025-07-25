import { styles } from "./ResultDisplay.styles";

const ResultDisplay = ({ resultData }) => {
  if (!resultData) return null;

  if (!resultData.success) {
    // Render error case
    return <div style={styles.errorText}>Error: {resultData.error}</div>;
  }

  // Render success with result true/false
  return (
    <div>
      <div>
        <strong>Parsed result:</strong>{" "}
        <span
          style={
            resultData.data.result === true
              ? styles.trueText
              : resultData.data.result === false
              ? styles.falseText
              : {}
          }
        >
          {resultData.data.result.toString()}
        </span>
      </div>

      <div style={styles.astWrapper}>
        <strong>Abstract Syntax Tree:</strong>
        <pre style={styles.astBox}>
          {JSON.stringify(resultData.data.ast, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default ResultDisplay;
