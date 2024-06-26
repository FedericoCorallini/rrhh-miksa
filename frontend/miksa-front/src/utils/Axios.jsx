import axios from "axios"

const BASE_URL = 'http://localhost:8080/api'

export const getAbsencePermissions = async () => {
    
    const config = {
        method: `get`,
        url: BASE_URL + '/absence-permission',
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const patchState = async (id, state) => {
    
    const config = {
        method: 'patch',
        url: BASE_URL + `/absence-permission/state/${id}`,
        data: state,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const getFile = async (id) => {
    
    const config = {
        method: 'get',
        url: BASE_URL + `/documentation/download/${id}`,
        responseType: 'blob',
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    const response = await axios(config);
    return response.data;
}

export const getEmployee = async (id) => {
    
    const config = {
        method: `get`,
        url: BASE_URL + `/employee/${id}`,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const putEmployee = async (id, data) => {
    
    const config = {
        method: 'put',
        url: BASE_URL + `/employee/${id}`,
        data: data,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const postEmployee = async (data) => {
    
    const config = {
        method: 'post',
        url: BASE_URL + `/employee`,
        data: data,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const postPermission = async (data) => {
    
    const config = {
        method: 'post',
        url: BASE_URL + `/absence-permission`,
        data: data,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const getEmployees = async () => {
    
    const config = {
        method: `get`,
        url: BASE_URL + '/employee',
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const deleteEmployee = async (id) => {
    
    const config = {
        method: `delete`,
        url: BASE_URL + `/employee/${id}`,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const deletePermission = async (id) => {
    
    const config = {
        method: `delete`,
        url: BASE_URL + `/absence-permission/${id}`,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}
export const deleteDocumentation = async (id) => {
    
    const config = {
        method: `delete`,
        url: BASE_URL + `/documentation/${id}`,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const postDocument = async (data) => {
    
    const config = {
        method: 'post',
        url: BASE_URL + `/documentation`,
        data: data,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}

export const postFile = async (file, docId) => {
    
    const config = {
        method: 'post',
        url: BASE_URL + `/documentation/upload/${docId}`,
        data: file,
        headers: { 
            'Access-Control-Allow-Origin': '*', 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`
         }
    } 

    return await axios(config);
}