import axios from 'axios';

export const key = "7b45a390504c5a2f6079662497b6ad99";

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default api;
