import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import {signInStart, signInSuccess, signInFailure} from '../redux/user/userSlice.js'
import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
    const [formData,setFormData] = useState({})
   const {loading,error} = useSelector((state)=>state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()                                                   
    const handleChange =(e)=>{
       setFormData({...formData, [e.target.id]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
        dispatch(signInStart())
        const res = await fetch('/api/auth/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
            
        })
        const data = await res.json();
        dispatch(signInSuccess(data))
        console.log(data)
        if(data.success === false){
            dispatch(signInFailure(data.message))
            return;
        }
        navigate('/')
    }catch(err){
     dispatch(signInFailure(error))
    }
    }
  return (
    <div className="p-3 max-w-md mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <p className='text-red-700 mt-5 mb-5 font-semibold ml-3'>{error? error|| 'Something went wrong': ''}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        
        <input
          type="email"
          placeholder="Email"
          id="email"
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
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg uppercase hover:capacity-95 disabled:opacity-80 max-w-sm p-2 ml-5 my-5">
        {loading ? 'Loading....' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-4 ml-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
    
    </div>
  );
}



