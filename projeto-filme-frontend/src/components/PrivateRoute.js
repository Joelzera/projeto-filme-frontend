import { Navigate, useLocation } from "react-router"


const isAuth = () => {
    const token = localStorage.getItem('token')
    const idUser = localStorage.getItem('id')
    if (typeof token !== 'string' && typeof idUser !== 'string') return false
    else if (token === 'undefined' && idUser === 'undefined') return false
    else return true
}

const PrivateRoute = ({ children }) => {
    const auth = isAuth()
    const location = useLocation()
    if (!auth) return <Navigate to='/login' state={{ from: location }} />
    return children
}

export default PrivateRoute