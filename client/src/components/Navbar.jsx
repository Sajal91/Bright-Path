import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { setFlashMessage } from "../redux/slices/flashMessageSlice";

const Navbar = ({ user }) => {
    const isUserAuthorised = useSelector((state) => state.isUserAuthorised.value);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem('bright-path-auth-token');
        dispatch(setFlashMessage({ success: true, message: "Logged Out Successfully" }))
        navigate('/login');
    };

    return (

        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-[999]" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-3">
                            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Bright Path</h1>
                        <p className="text-black font-semibold text-xl">{isUserAuthorised}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        {
                            user ?
                                <>
                                    <p className="text-gray-600">{user.firstName} {user.lastName}</p>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                                    >
                                        Logout
                                    </button>
                                </>
                                :
                                <NavLink
                                    to="/login"
                                    className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors"
                                >
                                    Sign In
                                </NavLink>
                        }
                        <NavLink
                            to="/signup"
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
                        >
                            Get Started
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar