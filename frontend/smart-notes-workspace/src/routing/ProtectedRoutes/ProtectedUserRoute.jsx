import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
export default function ProtectedUserRoute({children}) {
  const isAuthenticated = useSelector((state) => state.auth.isLoggedIn);

  return isAuthenticated ? children : <Navigate to="/login" replace />
}

