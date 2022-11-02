import axiosClient from "./axiosClient";
const messageApi = {
  add: (payload) => axiosClient.post("/message/add", payload),
  get: (payload) => axiosClient.post("message/get", payload),
  delete: (payload) => axiosClient.post("/message/delete", payload),
};

export default messageApi;
