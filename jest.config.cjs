module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/__mocks__/svgTransform.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};