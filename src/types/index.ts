export interface UserData {
  username: string;
  age: number;
  hobbies: string[];
}

export interface User extends UserData {
  id: string;
}

export type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

interface MessageResponse {
  message: string;
}

export type ResponseData = UserData | UserData[] | MessageResponse | string | null;

export type WorkerMessage = {
  type: "update";
  action: "create" | "update" | "delete";
  user: User;
};
