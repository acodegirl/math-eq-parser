# Math Equation Parser

A simple and extensible math expression parser that evaluates mathematical expressions from user input. This project demonstrates parsing, validation, and evaluation of arithmetic expressions.

## Tech Stack

- **Node.js**
- **Express.js** (Server)
- **React** (Client)
- **JavaScript**

## Instructions to Run the App

### 1. Ubuntu (using install script)

#### Requirements

1. [docker](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)
2. [user to be added to docker group](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user)

#### Installation (Recommended)

1. Run install script

```
curl https://raw.githubusercontent.com/acodegirl/math-eq-parser/main/install | bash
```

#### Installation with docker compose

1. Clone git repo

```
git clone https://github.com/acodegirl/math-eq-parser.git
```

2. Run docker compose

```
docker compose up
```

### 2. Windows

1. Clone the repository:
   ```powershell
   git clone https://github.com/your-username/math-eq-parser.git
   cd math-eq-parser
   ```
2. Install dependencies for server and client:
   ```powershell
   cd server
   npm install
   cd ../client
   npm install
   ```
3. Start the server:
   ```powershell
   cd ../server
   npm start
   ```
4. Start the client in a new terminal:
   ```powershell
   cd ../client
   npm start
   ```

The client will be available at `http://localhost:3000` and the server at `http://localhost:4000` by default.
