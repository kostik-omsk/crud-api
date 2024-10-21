import { validate as validateUuidV4 } from "uuid";
import { UserData } from "../types";

export const validateUuid = (id: string): boolean => {
  return validateUuidV4(id);
};

export const validateUserData = (data: UserData): boolean => {
  const { username, age, hobbies } = data;

  if (
    typeof username !== "string" ||
    typeof age !== "number" ||
    !Array.isArray(hobbies) ||
    hobbies.some((hobby) => typeof hobby !== "string")
  ) {
    return false;
  }

  return true;
};
