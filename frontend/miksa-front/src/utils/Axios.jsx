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
            'Content-Type': 'application/json'
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
         }
    } 

    const response = await axios(config);
    return response.data;
}