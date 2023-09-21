import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

const config: Config = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
  collectCoverageFrom: ["src/**/*.ts"],
  coverageProvider: "v8",
};

export default config;
