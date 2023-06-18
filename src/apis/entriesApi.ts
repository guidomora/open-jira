import axios from "axios";


// Creamos una instancia
const entriesApi = axios.create({
    // Como la app sale del localhost y siempre api va a ser parte
    // de todas las url
    baseURL:"/api"
})

export default entriesApi