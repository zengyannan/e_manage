import axios from 'axios';

let base = '/api/patient'

let patientUrl = '/patient'


export const getPatientList = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list', { params: params }).then(
        res => res.data);
}

export const getAllPatient = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/all', { params: params }).then(
        res => res.data);
}

export const updatePatient = params => {
    return axios.post(base + '/update', params).then(
        res => res.data);
}

export const insertPatient = params => {
    return axios.post(base + '/add', params).then(
        res => res.data);
}

export const deletePatient = params => {
    return axios.get(base + "/" + params.id + '/delete').then(
        res => res.data);
}

export const getPatientByToken = params => {
    return axios.get(base + "/byToken").then(
        res => res.data);
}

/**
 * 患者端方法
 */

export const getPatientInfo = params => {
    return axios.post(patientUrl + '/getInfo', params).then(
        res => res.data);
}

export const getLaboratorySheetList = params => {
    return axios.post(patientUrl + '/laboratorySheet/list', params).then(
        res => res.data);
}