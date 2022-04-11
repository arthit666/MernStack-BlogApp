import { Navigate,Outlet } from "react-router-dom"

const PrivateRoutes = ({user , path}) => {
  return user ? <Navigate to={path}/> : <Outlet/>
}

export default PrivateRoutes