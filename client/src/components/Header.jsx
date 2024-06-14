import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector, } from "react-redux";
import { signout } from "../redux/user/userSlice";
import { toast } from "react-toastify";

function Header() {
  const {currentUser} = useSelector(state=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSignOut=async ()=>{
    try{
     await fetch('/api/auth/signout');
     dispatch(signout())
     navigate('/sign-in')
     toast.success('Sign Out Successfull',{
      className:'text-green-600',
      autoClose: 1000,
      hideProgressBar: true
    })
    }catch(error){
  console.log(error)
    }
  }
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-slate-700">User Management App</h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="about">
            <li>About</li>
          </Link>
          <Link to='/profile'>
          {currentUser?
          (<li className="text-slate-600">{currentUser.username}</li>):''
          }
          </Link>
          
          <Link to="/sign-in">
          {currentUser ?
          (<img src={currentUser.profilePicture} alt='profile' className='h-7 w-7 rounded-full object-cover'/>)
          :(<li>Sign In</li>)
          } 
          </Link>

          {currentUser?
            (<li onClick={handleSignOut} className="text-red-600 font-bold cursor-pointer">Sign Out</li>):''
            }
        
        </ul>
      </div>
    </div>
  );
}

export default Header;
