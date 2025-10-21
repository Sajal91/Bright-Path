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
        <nav className="bg-black backdrop-blur-md border-b border-gray-200 sticky top-0 z-[999]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Bright Path
                            </h1>
                            <p className="text-xs text-white font-medium">
                                Career Guidance Platform
                            </p>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex items-center space-x-6">
                        {/* User Section */}
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="hidden sm:flex items-center space-x-3">
                                    <div className="h-8 w-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-sm font-semibold">
                                            {user.firstName?.[0]}{user.lastName?.[0]}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-white">
                                            {user.firstName} {user.lastName}
                                        </p>
                                        <p className="text-xs text-white/70">
                                            Welcome back!
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <NavLink
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-white hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to="/signup"
                                    className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Get Started
                                </NavLink>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar