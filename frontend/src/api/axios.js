import axios from 'axios'

// Same origin in production (the server serves the site and the API together)
export default axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api', timeout: 20000 })
