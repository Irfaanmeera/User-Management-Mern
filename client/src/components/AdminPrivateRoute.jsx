import { useSelector } from "react-redux"
import { Outlet,Navigate } from "react-router-dom"

function AdminPrivateRoute() {
    const {admin} = useSelector(state=>state.admin)
  return admin? <Outlet/> : <Navigate to='/admin'/>
}

export default AdminPrivateRoute