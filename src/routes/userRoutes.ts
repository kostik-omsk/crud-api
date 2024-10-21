import { IncomingMessage, ServerResponse } from "http";
import {
  getUsers,
  getUser,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/usersController";
import { sendResponse } from "../utils/sendResponse";
import cluster from "cluster";

export const userRoutes = (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;

  if (!cluster.isWorker) {
    console.log(`Request received: ${method} ${url}`);
  }

  switch (method) {
    case "GET":
      if (url === "/api/users") {
        return getUsers(req, res);
      } else if (url?.startsWith("/api/users/")) {
        const userId = url.split("/").pop() as string;
        return getUser(req, res, userId);
      }
      break;
    case "POST":
      if (url === "/api/users") {
        return createUserController(req, res);
      }
      break;
    case "PUT":
      if (url?.startsWith("/api/users/")) {
        const userId = url.split("/").pop() as string;
        return updateUserController(req, res, userId);
      }
      break;
    case "DELETE":
      if (url?.startsWith("/api/users/")) {
        const userId = url.split("/").pop() as string;
        return deleteUserController(req, res, userId);
      }
      break;

    default:
      sendResponse(res, 405, { message: "Method Not Allowed" });
  }

  sendResponse(res, 404, { message: "Resource Not Found" });
};
