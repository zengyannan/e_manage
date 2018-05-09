import axios from 'axios';

let base = '/api/hr'

export const getHrList = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list', { params: params }).then(
        res => res.data);
}
export const getHrListByRoleName = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list/byRoleName', { params: params }).then(
        res => res.data);
}

export const updateHr = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.post(base + '/update', params).then(
        res => res.data);
}

export const insertHr = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.post(base + '/add', params).then(
        res => res.data);
}

export const deleteHr = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + "/" + params.id + '/delete').then(
        res => res.data);
}

export const setRoles = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.post(base + "/setRoles", params).then(
        res => res.data);
}