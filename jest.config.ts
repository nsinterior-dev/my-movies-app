import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^.+\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
};

export default createJestConfig(customJestConfig);
