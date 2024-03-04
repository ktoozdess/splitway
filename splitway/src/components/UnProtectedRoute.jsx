import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context/AuthContext";

export const UnProtectedRoute = ({ children }) => {
    const {user} = useContext(Context)

    if(user){
      return <Navigate to='/homepage' replace/>
    }else{
      return children
    }

};