import superagent from 'superagent'

const API_ROOT = 'https://master.project.henceforthsolutions.com:3000/'
const responseBody = (res: any) => res?.body

let Language = ''
const language = (req: any) => {
  Language = 'ENGLISH'
}

let token: any = null
const tokenPlugin = (req: any) => {
  if (token) {
    req.set('authorization', `Bearer ${token}`)
  }
}

const requests = {
  del: (url: string) => superagent.delete(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: (url: string) => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url: string, body: any) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  patch: (url: string, body: any) => superagent.patch(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url: string, body: any) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  file: (url: string, key: string, file: any) =>
    superagent.post(`${API_ROOT}${url}`).attach(key, file).use(tokenPlugin).then(responseBody),
  chatFile: (url: string, key: string, file: any, onProgress: any) =>
    superagent
      .post(`${API_ROOT}${url}`)
      .attach(key, file)
      .use(tokenPlugin)
      .on('progress', (event) => {
        if (onProgress) {
          onProgress(event)
        }
      })
      .then(responseBody),
  uploadImage: (body: any) =>
    superagent.post(`http://139.59.47.49:4004/api/upload/image`, body).use(tokenPlugin).then(responseBody)
}
const auth = {
  
  signup: (payload: any) => requests.post('signup', payload),
  verifyphone: (payload: any) => requests.put('verify-phone', payload),
  verifyemail: (payload: any) => requests.put('verify-email', payload),
  login: (payload: any) => requests.post('signin', payload),
  forgot: (payload: any) => requests.put('forget-password', payload),
  reset: (payload: any) => requests.put('reset-password', payload),
  resendEmailOTP: (payload: any) => requests.put('resend-otp', payload),
  verifyotp: (payload: any) => requests.put('verify-otp', payload),
  resendPhoneOTP: (payload: any) => requests.put('resend-otp-phone', payload),
  upload: (payload: any) => requests.uploadImage(payload),
  postImage: (payload: any) => requests.patch('profile', payload)
}
const allapi = {
  requests,
  auth,
  token,
  setToken: (_token: any) => {
    token = _token
  }
}

export default allapi
