import axios from 'axios';

let base = '/api/organ'

export const getOrganList = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/list', { params: params }).then(
        res => res.data);
}

<<<<<<< HEAD
export const getAllOrgan = params => {
    // let url = base+"/list?pageNum="+params.pageNum+"&"
    return axios.get(base + '/all', { params: params }).then(
        res => res.data);
}

=======
>>>>>>> 649502967aece8873c6c5ca43a0bbabf6f858ab5
export const updateOrgan = params => {
    return axios.post(base + '/update', params).then(
        res => res.data);
}

export const insertOrgan = params => {
    return axios.post(base + '/add', params).then(
        res => res.data);
}

export const deleteOrgan = params => {
    return axios.get(base + "/" + params.id + '/delete').then(
        res => res.data);
}