import axios from "axios";
// import { BASE_URL } from "../constants/constants";

 const BASE_URL = "https://api.themoviedb.org/3"
const instance = axios.create({
    baseURL: BASE_URL,
});

export default instance;