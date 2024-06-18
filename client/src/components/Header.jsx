import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/user/userSlice";
import { toast } from "react-toastify";

function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout');
      dispatch(signout());
      navigate('/sign-in');
      toast.success('Sign Out Successful', {
        className: 'text-green-600',
        autoClose: 1000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-slate-700">User Management App</h1>
        </Link>
        <ul className="flex gap-4 items-center">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <Link to="/profile">
                  <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="h-7 w-7 rounded-full object-cover"
                  />
                </Link>
              </li>
              <li
                onClick={handleSignOut}
                className="text-red-600 font-bold cursor-pointer"
              >
                Sign Out
              </li>
            </>
          ) : (
            <li>
              <Link to="/sign-in">Sign In</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
