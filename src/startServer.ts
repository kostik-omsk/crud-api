import "dotenv/config";
import { createServer as createServerHttp } from "node:http";
import { userRoutes } from "./routes/userRoutes";
import { sendResponse } from "./utils/sendResponse";

export default function startServer() {
  const server = createServerHttp((req, res) => {
    try {
      userRoutes(req, res);
    } catch (error) {
      if (error instanceof Error) {
        sendResponse(res, 500, { message: error.message });
      } else {
        sendResponse(res, 500, { message: "Unknown error occurred" });
      }
    }
  });

  return server;
}
