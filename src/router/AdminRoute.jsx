import { Navigate } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const AdminRoute = ({children})=>{

// eslint-disable-next-line no-unused-vars
const {user,loading} = useContext(AuthContext);

const isAdmin = useAdmin(user?.email);


// if(user && !isAdmin){

// // alert("Only admin can access dashboard")

// return <Navigate to="/"/>

// }


if(user && isAdmin){

return children;

}

// return <Navigate to="/"/>;
return children;

}

export default AdminRoute;