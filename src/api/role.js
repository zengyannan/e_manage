import axios from 'axios';

let base = '/api/role'

export const getRoleList = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list', { params: params }).then(
        res => res.data);
}

export const getAllRole = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/all', { params: params }).then(
        res => res.data);
}

export const updateRole = params => {
    return axios.post(base + '/update', params).then(
        res => res.data);
}

export const setRoleMenu = params => {
    return axios.post(base + '/menu/set', params).then(
        res => res.data);
}


export const insertRole = params => {
    return axios.post(base + '/add', params).then(
        res => res.data);
}

export const deleteRole = params => {
    return axios.get(base + "/" + params.id + '/delete').then(
        res => res.data);
}