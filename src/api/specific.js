import axios from 'axios';

let base = '/api/specific'

export const getSpecificList = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list', { params: params }).then(
        res => res.data);
}

export const getSpecificListByOrganId = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list/byOrganId/' + params.id).then(
        res => res.data);
}

export const getAllSpecific = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/all', { params: params }).then(
        res => res.data);
}


export const updateSpecific = params => {
    return axios.post(base + '/update', params).then(
        res => res.data);
}

export const insertSpecific = params => {
    return axios.post(base + '/add', params).then(
        res => res.data);
}

export const deleteSpecific = params => {
    return axios.get(base + "/" + params.id + '/delete').then(
        res => res.data);
}