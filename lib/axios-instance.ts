import axios from "axios";

export const Api = axios.create({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const S3Api = axios.create({
  baseURL: "/api/s3",
  headers: {
    "Content-Type": "application/json",
  },
});
