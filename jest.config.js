export const testEnvironment = "node";
export const roots = ["<rootDir>/tests"];
export const testMatch = ["**/?(*.)+(test).[tj]s?(x)"];
export const moduleFileExtensions = ["ts", "js", "json", "node"];
export const transform = {
  "^.+\\.tsx?$": "ts-jest",
};

export default {
  testEnvironment,
  roots,
  testMatch,
  moduleFileExtensions,
  transform,
};
