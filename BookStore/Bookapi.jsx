import axios from "axios";
const BASE_URL = "https://www.googleapis.com/books/v1";
export const searchBooks = (query) =>
  axios.get(`${BASE_URL}/volumes?q=${query}`);