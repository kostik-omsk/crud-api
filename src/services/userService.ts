import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { v4 as uuidv4 } from "uuid";
import { User, UserData } from "@/types";

const usersFilePath = resolve(__dirname, "../../db/users.json");

const getAllUsers = async () => {
  const data = await readFile(usersFilePath, "utf-8");
  return JSON.parse(data);
};

const getUserById = async (id: string) => {
  const users = await getAllUsers();
  return users.find((user: User) => user.id === id);
};

const createUser = async (userData: UserData) => {
  const users = await getAllUsers();
  const newUser = { id: uuidv4(), ...userData };
  users.push(newUser);
  await writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
  return newUser;
};

const updateUser = async (id: string, userData: UserData) => {
  const users = await getAllUsers();
  const index = users.findIndex((user: User) => user.id === id);
  if (index === -1) {
    return null;
  }
  users[index] = { id, ...userData };
  await writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
  return users[index];
};

const deleteUser = async (id: string) => {
  const users = await getAllUsers();
  const index = users.findIndex((user: User) => user.id === id);
  if (index === -1) {
    return null;
  }
  const [deletedUser] = users.splice(index, 1);
  await writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
  return deletedUser;
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
