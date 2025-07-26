interface ActionResponse {
  status: "success" | "error";
  message: string;
  data?: unknown;
}
