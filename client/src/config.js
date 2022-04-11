import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL : "https://arthit-blog-app.herokuapp.com/api/"
});