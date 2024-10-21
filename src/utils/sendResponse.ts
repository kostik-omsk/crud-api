import { ServerResponse } from "http";
import { ResponseData } from "@/types";

export const sendResponse = (res: ServerResponse, statusCode: number, data: ResponseData) => {
  if (typeof data === "string") {
    const msg = `"${statusCode}: ${data}"`;
    res.writeHead(statusCode, { "Content-Type": "text/plain" });
    res.end(msg);
  } else {
    res.writeHead(statusCode, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  }
};
