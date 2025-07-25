const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const parseRoute = require("./routes/parseRoute");
const client = require("prom-client");

const app = express();
const port = process.env.PORT || 4000;

// Create a Registry which registers the metrics
const register = new client.Registry();

// Enable collection of default metrics (nodejs process, gc, etc.)
client.collectDefaultMetrics({ register });

// Expose /metrics endpoint to Prometheus
app.get("/metrics", async (req, res) => {
  res.setHeader("Content-Type", register.contentType);
  const metrics = await register.metrics();
  res.end(metrics);
});

// Enable CORS
app.use(cors());

// Parse incoming request bodies with JSON payloads
app.use(bodyParser.json());

// Use the parsed route module
app.use(parseRoute); // Registers /parse POST endpoint

// Expose /health endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", uptime: process.uptime() });
});

app.listen(port, () => {
  console.log(`Parser API running at http://localhost:${port}`);
});
