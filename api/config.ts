import axios from "axios";

export const api = axios.create({
  baseURL: "https://codelabllc.com/taskrunner/app/api/v1", // Replace with your API base URL
});
