import axiosClient from './axiosClient'
const messageApi = {
  add: payload => axiosClient.post('/message/add', payload),
  get: payload => axiosClient.post('message/get', payload),
}

export default messageApi