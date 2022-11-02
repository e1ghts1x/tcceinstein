import { Navigate } from "react-router";
import jwtdecode from "jwt-decode"

export const RequireAuth = (props) => {
    const token = localStorage.getItem("token");
    const currentDate = new Date()

    if (!token) {
        console.log(props.to)
        return <Navigate to={props.to || "/" }/>;
    }
    try{
        const decodedToken = jwtdecode(token)
        if (decodedToken.exp  * 1000 < currentDate.getTime()){
            console.log("Token expirado ou inválido.")
            console.log(props.pathToLocation)
            return <Navigate to={props.to || "/" } />;
        }
    } catch(error){
        console.log(props.pathToLocation)
        return <Navigate to={props.to || "/" }  />;
    }

    return props.children;
};
