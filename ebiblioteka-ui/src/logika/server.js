import axios from "axios";

const token = window.sessionStorage.getItem('token');

const server = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    timeout: 10000,
});

if (token) {
    server.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default server;
