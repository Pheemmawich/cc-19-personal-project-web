import axios from "axios";

export const actionRegister = async (value) => {
    return await axios.post('http://localhost:8000/api/register', value)
}

export const actionLogin = async (value) => {
    return await axios.post('http://localhost:8000/api/login', value)
}

// export const updateProfile = async (token, input) => {
//     return await axios.put('http://localhost:8000/user/update-account', input, {
//         header : {
//             Authorization: `Bearer ${token}`
//         }
//     })
// }

export const actiongetMe = async(token) => {
    return await axios.get("http://localhost:8000/api/getme", {
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
}
