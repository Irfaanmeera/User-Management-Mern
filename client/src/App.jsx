import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Login from './pages/admin/Login'
import PrivateRoute from "./components/PrivateRoute";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import AdminHome from "./pages/admin/AdminHome";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import EditUser from "./pages/admin/EditUser";
import AddUser from "./pages/admin/AddUser";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>

      <Routes>
        <Route path="/admin" element={<Login/>}/>

        <Route element={<AdminPrivateRoute/>}>
        <Route path="/admin/home" element={<AdminHome/>}/>
        <Route path="/admin/edit/:id" element={<EditUser/>} />
        <Route path="/admin/addUser" element={<AddUser/>} />
        </Route>
       
        <Route path="/admin/addUser" element={<AddUser/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
