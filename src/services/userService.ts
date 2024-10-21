import { v4 as uuidv4 } from "uuid";
import { User, UserData } from "@/types";
import cluster from "cluster";

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
    if (cluster.isWorker) {
      process.send?.({
        type: "sync",
        action: "create",
        user: newUser,
      });
    }
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
      if (cluster.isWorker) {
        process.send?.({
          type: "sync",
          action: "update",
          user: users[index],
        });
      }
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
      if (cluster.isWorker) {
        process.send?.({
          type: "sync",
          action: "delete",
          user: deletedUser,
        });
      }
      resolve(deletedUser);
    }
  });
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser, users };
