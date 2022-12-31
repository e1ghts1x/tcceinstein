const token = localStorage.getItem('token')

export const baseURL = "http://192.168.0.203:3001/api"
export const config = {
    headers:{
        Authorization: "Bearer " + token
    },
    token: token
}
