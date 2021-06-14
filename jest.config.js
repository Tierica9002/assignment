// jest.config.js
const { defaults } = require("jest-config");
module.exports = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxxy",
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
};
