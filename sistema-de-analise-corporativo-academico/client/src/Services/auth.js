import { Navigate } from "react-router";
import jwtdecode from "jwt-decode"

export const RequireAuth = ({ children }) => {
    const token = localStorage.getItem("token");
    const currentDate = new Date()

    if (!token) {
        return <Navigate to="/admin" />;
    }
    try{
        const decodedToken = jwtdecode(token)
        if (decodedToken.exp  * 1000 < currentDate.getTime()){
            console.log("Token expirado ou inválido.")
            return <Navigate to="/admin" />;
        }
    } catch(error){
        return <Navigate to="/admin" />;
    }
        

    return children;
};
