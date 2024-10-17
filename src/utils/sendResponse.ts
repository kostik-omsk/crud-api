import { ServerResponse } from "http";
import { ResponseData } from "@/types";

export const sendResponse = (res: ServerResponse, statusCode: number, data: ResponseData) => {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};
