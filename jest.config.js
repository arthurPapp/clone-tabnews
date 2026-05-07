const nextJest = require('next/jest')
const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });

const createJestConfig = nextJest({
    dir: ".",
});

const jestConfig = createJestConfig({
    moduleDirectories: ["node_modules", "<rootDir>"],
    testEnvironment: "node",
    setupFiles: ["<rootDir>/jest.load.env.js"],
});

module.exports = jestConfig;