import axios from 'axios'
import queryString from 'query-string'

const baseUrl = "http://localhost:5000/api/v1/"
const getToken = () => localStorage.getItem('token')

const axiosClient = axios.create({
  baseURL: baseUrl,
  paramsSerializer: params => queryString.stringify({ params })
})

axiosClient.interceptors.request.use(async config => {
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      'authorization': `Barer ${getToken()}`
    }
  }
})

axiosClient.interceptors.response.use(response => {
  if (response && response.data) return response.data
  return response
}, err => {
  if (!err.response) {
    return alert(err)
  }
  throw err.response
})

export default axiosClient