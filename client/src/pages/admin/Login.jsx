import { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin, adminLoginFailure } from "../../redux/admin/adminSlice.js";
import { toast } from "react-toastify";

export default function Login() {
    const [formData,setFormData] = useState({})
    const [error,setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()   
    const {admin,isLogged} = useSelector((state)=>state.admin)   
    

    const handleChange =(e)=>{
       setFormData({...formData, [e.target.id]:e.target.value})
       console.log(formData)
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
        const res = await fetch('/api/admin/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
            
        })
        const data = await res.json();
        dispatch(adminLogin(data))
        toast.success('Login Successfull',{
          autoClose: 500,
          className:'text-green-600',
          hideProgressBar: true
        })
        console.log(data)

        if(data.success===false){
        dispatch(adminLoginFailure(data))
        toast.error(data.message)
        navigate('/admin')
        return;
        }
       navigate('/admin/home')
    }catch(error){
      console.log(error)
    }
    }
  return (
    <div className="p-3 max-w-md mx-auto ">
      <h1 className="text-3xl text-slate-700 text-center font-semibold my-14 ">Admin Sign In</h1>
      <p className='text-red-700 mt-5 mb-5 font-semibold ml-3'>{error? error|| 'Something went wrong': ''}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        
        <input
          type="string"
          placeholder="Name"
          id="name"
          className="bg-slate-100 p-3 rounded-lg my-2"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg my-2"
          onChange={handleChange}
        />
        <button  className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-80 max-w-lg p-2  my-2">
        Sign In
        </button>
        
      </form>
     
    
    </div>
  );
}




