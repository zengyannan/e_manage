import axios from "axios";

let base = '/api/token'

export const requestLogin = params =>{
    return axios.post(base+"/get",params)
    .then(res=>res.data);
}