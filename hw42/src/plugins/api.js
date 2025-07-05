import axios from "axios";


const api = axios.create({
    baseURL:"https://api-todolist-multiuser.onrender.com/Trung/contacts"
})

export default api