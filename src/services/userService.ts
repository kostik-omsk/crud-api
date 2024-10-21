import { v4 as uuidv4 } from "uuid";
import { User, UserData } from "@/types";

const users: User[] = [];

const getAllUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    resolve(users);
  });
};

const getUserById = async (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    const user = users.find((user: User) => user.id === id);
    if (!user) {
      resolve(null);
    } else {
      resolve(user);
    }
  });
};

const createUser = async (userData: UserData): Promise<User> => {
  return new Promise((resolve) => {
    const newUser = { id: uuidv4(), ...userData };
    users.push(newUser);
    resolve(newUser);
  });
};

const updateUser = async (id: string, userData: UserData): Promise<User | null> => {
  return new Promise((resolve) => {
    const index = users.findIndex((user: User) => user.id === id);
    if (index === -1) {
      resolve(null);
    } else {
      users[index] = { id, ...userData };
      resolve(users[index]);
    }
  });
};

const deleteUser = async (id: string): Promise<User | null> => {
  return new Promise((resolve) => {
    const index = users.findIndex((user: User) => user.id === id);
    if (index === -1) {
      resolve(null);
    } else {
      const [deletedUser] = users.splice(index, 1);
      resolve(deletedUser);
    }
  });
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
