import axiosClient from './axiosClient'

const authApi = {
  verifyToken: () => axiosClient.post('auth/verify-token'),
  signin: payload => axiosClient.post('auth/signin', payload),
  signup: payload => axiosClient.post('auth/signup', payload),
  googleLogin: payload => axiosClient.post('auth/google-login', payload),
}

export default authApi