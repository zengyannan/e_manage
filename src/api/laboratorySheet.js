import axios from 'axios';

let base = '/api/laboratorySheet'

export const getLaboratorySheetList = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list', { params: params }).then(
        res => res.data);
}

export const getAllLaboratorySheet = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/all', { params: params }).then(
        res => res.data);
}


export const updateLaboratorySheet = params => {
    return axios.post(base + '/update', params).then(
        res => res.data);
}

export const insertLaboratorySheet = params => {
    return axios.post(base + '/add', params).then(
        res => res.data);
}

export const deleteLaboratorySheet = params => {
    return axios.get(base + "/" + params.id + '/delete').then(
        res => res.data);
}