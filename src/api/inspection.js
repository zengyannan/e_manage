import axios from 'axios';

let base = '/api/inspection'

export const getInspectionList = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list', { params: params }).then(
        res => res.data);
}

export const getAllInspection = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/all', { params: params }).then(
        res => res.data);
}


export const updateInspection = params => {
    return axios.post(base + '/update', params).then(
        res => res.data);
}

export const insertInspection = params => {
    return axios.post(base + '/add', params).then(
        res => res.data);
}

export const deleteInspection = params => {
    return axios.get(base + "/" + params.id + '/delete').then(
        res => res.data);
}