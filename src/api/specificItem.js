import axios from 'axios';

let base = '/api/specificItem'

export const getSpecificItemList = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list', { params: params }).then(
        res => res.data);
}

export const getAllSpecificItem = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/all', { params: params }).then(
        res => res.data);
}


export const updateSpecificItem = params => {
    return axios.post(base + '/update', params).then(
        res => res.data);
}

export const insertSpecificItem = params => {
    return axios.post(base + '/add', params).then(
        res => res.data);
}

export const deleteSpecificItem = params => {
    return axios.get(base + "/" + params.id + '/delete').then(
        res => res.data);
}