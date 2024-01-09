import axios from "axios";
const token = "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";
export const githubApi = axios.create({
  baseURL: "https://api.github.com/repos/facebook/react",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
