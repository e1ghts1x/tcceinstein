import { Navigate } from "react-router";
import jwtdecode from "jwt-decode"

export const RequireAuth = (props) => {
    const token = localStorage.getItem("token");
    const currentDate = new Date()
    const role = props.role || "user"
    console.log(role)

    if (!token) {
        return <Navigate to={props.to || "/" }/>;
    }
    try{
        const decodedToken = jwtdecode(token)
        console.log(decodedToken)
        if (decodedToken.exp  * 1000 < currentDate.getTime()){
            return <Navigate to={props.to || "/" } />;
        }
        if(decodedToken.role !== role){
            return <Navigate to={props.to || "/" } />;
        }
    } catch(error){
        return <Navigate to={props.to || "/" }  />;
    }
    return props.children;
};
