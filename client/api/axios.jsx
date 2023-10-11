import axios from "axios";
const url = import.meta.env.VITE_URL_BACKEND

const instance = axios.create({
    baseURL: "http://localhost:4000/api",
    timeout: 3000,
    headers: {'content-type': 'application/json'}
  });

export default instance  