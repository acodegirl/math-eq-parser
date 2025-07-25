# Math Expression Parser Server

This server provides an API for parsing and evaluating mathematical expressions.

## Features

- Parse and evaluate math expressions via HTTP API
- Input validation and error handling
- Unit tests for core functionality

## Requirements

- [Node.js](https://nodejs.org/) (v22 or higher)
- [npm](https://www.npmjs.com/) (v10 or higher)

## Installation

```bash
npm install
```

## Running the Server

```bash
npm start
```

The server will start on the default port (e.g., `http://localhost:4000`).

## API Usage

- **POST** `/evaluate`

  - **Body:** `{ "expression": "12 + 3 != 4 / 2 + 5" }`
  - **Response:** `{ "success": true|false, "ast": {/* abstract syntax tree object */} }`
    - `result`: Boolean indicating if the expression is valid and can be evaluated.
    - `ast`: The abstract syntax tree representation of the parsed expression.

- **GET** `/metrics`

  - **Description:** Returns server metrics such as uptime, request counts, and memory usage.
  - **Response:** `{ # TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0.281 }`

- **GET** `/health`
  - **Description:** Health check endpoint to verify if the server is running.
  - **Response:** `{"status":"ok","uptime":7.9229729}`

## Running Tests

```bash
npm test
```

## Project Structure

## nearlyParser Directory

The `nearlyParser/` directory contains the grammar and parser logic for mathematical expressions. It uses the [nearley](https://nearley.js.org/) parser generator to define the grammar rules and generate an abstract syntax tree (AST) from input expressions. This parser is responsible for validating the syntax and structure of mathematical expressions before they are evaluated by the server.

- `grammar.ne` - Defines the grammar rules for parsing math expressions.
- `compile.js` - Compiles the `grammar.ne` file into a JavaScript parser module that can be used by the application. This script is typically run as a build step to generate the parser code from the grammar definition.
- `parser.js` - Initializes and exports the parser using the compiled grammar. It provides an interface for parsing input expressions and generating the corresponding AST.
