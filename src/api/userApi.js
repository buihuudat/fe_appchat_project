import axiosClient from "./axiosClient";

const userApi = {
  get: payload => axiosClient.post(`user/get/${payload.username}`, payload),
  update: payload => axiosClient.put('user/update', payload),
  get_all: () => axiosClient.get('user/get-all')
}

export default userApi