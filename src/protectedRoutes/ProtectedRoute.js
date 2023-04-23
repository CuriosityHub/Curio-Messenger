import { useContext } from "react"
import { Navigate } from "react-router"
import { AuthContext } from "../context/AuthContext"

export const ProtectedRoute = ({ children }) => {

    const { currentUser } = useContext(AuthContext)

    if (!currentUser) {
        return <Navigate to='/' />
    }
    return children;
}