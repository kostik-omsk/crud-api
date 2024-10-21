import { ServerResponse, IncomingMessage } from "http";
import { getUserById, getAllUsers, createUser, updateUser, deleteUser } from "../services/userService";
import { validateUserData, validateUuid } from "../utils/validators";
import { sendResponse } from "../utils/sendResponse";

const getRequestBody = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => resolve(body));
    req.on("error", (err) => reject(err));
  });
};

export const getUsers = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = getAllUsers();
    sendResponse(res, 200, users);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, { message: "Internal Server Error" });
  }
};

export const getUser = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!validateUuid(userId)) {
    return sendResponse(res, 400, { message: "Invalid User ID" });
  }

  try {
    const user = getUserById(userId);
    if (!user) {
      return sendResponse(res, 404, { message: "User not found" });
    }
    sendResponse(res, 200, user);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, { message: "Internal Server Error" });
  }
};

export const createUserController = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const body = await getRequestBody(req);
    const userData = JSON.parse(body);

    if (!validateUserData(userData)) {
      return sendResponse(res, 400, { message: "Invalid user data" });
    }

    const newUser = createUser(userData);
    sendResponse(res, 201, newUser);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, { message: "Internal Server Error" });
  }
};

export const updateUserController = async (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!validateUuid(userId)) {
    return sendResponse(res, 400, { message: "Invalid User ID" });
  }

  try {
    const body = await getRequestBody(req);
    const userData = JSON.parse(body);

    if (!validateUserData(userData)) {
      return sendResponse(res, 400, { message: "Invalid user data" });
    }

    const updatedUser = updateUser(userId, userData);
    if (!updatedUser) {
      return sendResponse(res, 404, { message: "User not found" });
    }

    sendResponse(res, 200, updatedUser);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, { message: "Internal Server Error" });
  }
};

export const deleteUserController = (req: IncomingMessage, res: ServerResponse, userId: string) => {
  if (!validateUuid(userId)) {
    return sendResponse(res, 400, { message: "Invalid User ID" });
  }

  try {
    const deletedUser = deleteUser(userId);
    if (!deletedUser) {
      return sendResponse(res, 404, { message: "User not found" });
    }

    sendResponse(res, 204, null);
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, { message: "Internal Server Error" });
  }
};
