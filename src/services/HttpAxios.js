import axios from "axios";

const urlServidor = 'http://127.0.0.1:8000/api';

export const http = () => {

    let token = localStorage.getItem('access_token')
    
    const interceptor = axios.create({
        baseURL: urlServidor,
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ token
        },
        timeout: 30000
    });

    // Capturar errores (401 no esta autenticado (no es correcto), 403 no essta autortizado, )
    interceptor.interceptors.response.use(
        (response) => {
            return response // puede continuar no ha pasado nada
        },
        (error) => {
            // no esta logeado
            if (error.response.status === 401) {
                // el tokken esta mal
                localStorage.removeItem('access_token');
                window.location.href = '/login'
            }

            return Promise.reject(error)
        }
    )


    return interceptor;
}
// las 2 funciones hacen lo mismo
// const http2 = function () {
    
// }

// function http3 (){

// }