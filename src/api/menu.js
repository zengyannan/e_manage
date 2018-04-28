import axios from 'axios';

let base = '/api/menu'

export const getMenuList = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list', { params: params }).then(
        res => res.data);
}

export const getAllMenu = params => {
    return axios.get(base + '/all').then(
        res => res.data);
}


export const getMenuTree = params => {
    return axios.get(base + "/tree", params).then(
        res => res.data);
}

export const getAllMenuTree = params => {
    return axios.get(base + "/allTree", params).then(
        res => res.data);
}

export const updateMenu = params => {
    return axios.post(base + '/update', params).then(
        res => res.data);
}

export const insertMenu = params => {
    return axios.post(base + '/add', params).then(
        res => res.data);
}

export const deleteMenu = params => {
    return axios.get(base + "/" + params.id + '/delete').then(
        res => res.data);
}