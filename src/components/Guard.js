import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const Guard = props => {
    const user = useUser()
    return user?.isAdmin? props.children : <Navigate to="/login" />
}

export default Guard