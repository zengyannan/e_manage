import axios from 'axios';

let base = '/api/menu'

export const getAllMenu = params =>{
    return axios.get(base+'/list',params).then(
        res => res.data);
}


export const getMenuTree = params =>{
    return axios.get(base+"/tree",params).then(
        res=>res.data);
}