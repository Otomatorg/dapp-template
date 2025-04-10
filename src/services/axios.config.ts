import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

api.interceptors.response.use(
  function (response) {
    return response
  },

  async function (error) {
    const {
      response: { status },
    } = error

    if (status === 403) {
      window.location.href = '/403'
    }
    return Promise.reject(error)
  },
)

// Initialize with token from localStorage if available
const token = localStorage.getItem('token')
api.defaults.headers.common['Authorization'] = token || null

export const setAxiosAuthorization = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = token
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}
