import axios from 'axios';

let base = '/api/laboratorySheet'

export const getLaboratorySheetList = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list', { params: params }).then(
        res => res.data);
}

export const getLaboratorySheetListByOrgan = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list/byOrgan', { params: params }).then(
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

export const setSuggest = params => {
    return axios.post(base + '/suggest/set', params).then(
        res => res.data);
}

export const insertLaboratorySheet = params => {
    return axios.post(base + '/add', params).then(
        res => res.data);
}


export const insertLaboratorySheetByDoctor = params => {
    return axios.post(base + '/add/byDoctor', params).then(
        res => res.data);
}

export const insertLaboratorySheetByPatient = params => {
    return axios.post(base + '/add/byPatient', params).then(
        res => res.data);
}


export const deleteLaboratorySheet = params => {
    return axios.get(base + "/" + params.id + '/delete').then(
        res => res.data);
}