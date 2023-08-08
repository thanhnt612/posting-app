import axios from "axios";

export const http = axios.create({
  baseURL: "https://routine-server.vercel.app",
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response?.status === 401) {
      //Show error
    }
    if (error.response?.status === 400 || error.response?.status === 404) {
      //Show error
    }
    return Promise.reject(error);
  }
);
