/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // preset: 'ts-jest',
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/fileTransformer.cjs",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  setupFiles: ["<rootDir>/test-setup.js"],
};
