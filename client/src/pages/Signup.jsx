import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function Signup() {
    const [formData,setFormData] = useState({})
    const[error,setError]= useState(null)  
    const [loading,setLoading] = useState(false)   
    const navigate = useNavigate()                                                   
    const handleChange =(e)=>{
       setFormData({...formData, [e.target.id]:e.target.value})
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            setLoading(true)
        const res = await fetch('/api/auth/signup',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
            
        })
        const data = await res.json();
        console.log(data)
        setLoading(false)
        if(data.success === false){
            setError(true)
            return;
        }
        navigate('/sign-in')
    }catch(err){
      setLoading(false);
      setError(true);
    }
    }
  return (
    <div className="p-3 max-w-md mx-auto ">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <p className='text-red-700 mt-5 mb-5 font-semibold'>{error && 'Username already exists'}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-100 p-3 rounded-lg my-2"
          onChange={handleChange}
        />
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
        <button disabled={loading} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-85 disabled:opacity-80 max-w-lg p-2">
        {loading ? 'Loading....' : 'Sign Up'}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-4 ml-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
    
    </div>
  );
}


