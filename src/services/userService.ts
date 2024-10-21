import { v4 as uuidv4 } from "uuid";
import { User, UserData } from "@/types";

const users: User[] = [];

const getAllUsers = () => {
  return users;
};

const getUserById = (id: string) => {
  return users.find((user: User) => user.id === id);
};

const createUser = (userData: UserData) => {
  const newUser = { id: uuidv4(), ...userData };
  users.push(newUser);
  return newUser;
};

const updateUser = (id: string, userData: UserData) => {
  const index = users.findIndex((user: User) => user.id === id);
  if (index === -1) {
    return null;
  }
  users[index] = { id, ...userData };
  return users[index];
};

const deleteUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);
  if (index === -1) {
    return null;
  }
  const [deletedUser] = users.splice(index, 1);
  return deletedUser;
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
