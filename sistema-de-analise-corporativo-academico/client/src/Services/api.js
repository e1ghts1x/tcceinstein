const token = localStorage.getItem('token')

export const baseURL = "http://localhost:3001/api"
export const config = {
    headers:{
        Authorization: "Bearer " + token
    },
    token: token
}
