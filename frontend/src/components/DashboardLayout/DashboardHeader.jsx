import { Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react";
import { LogOutIcon, Menu, } from 'lucide-react';

import { useSendLogoutMutation } from "../../features/auth/authApiSlice";

const DASH_REGEX = /^\/dash(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/
const TASKS_REGEX = /^\/dash\/tasks(\/)?$/

const DashboardHeader = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) {
            navigate("/")
        }
    }, [isSuccess, navigate])

    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error?.data?.message}</p>

    let dashClass = null
    if(!DASH_REGEX.test(pathname) && !USERS_REGEX.test(pathname) && TASKS_REGEX.test(pathname)) {
        dashClass = ""
    }

    return (
        <header>
            <nav className="bg-white mb-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo/Home Link */}
                        <Link to="/" className="flex items-center">
                            <span className="text-xl font-bold text-blue-600">MyApp</span>
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center space-x-4">
                            <Link
                                to="/"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/tasks"
                                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                            >
                                Tasks
                            </Link>
                        </div>

                        <div onClick={sendLogout} className="flex gap-2 cursor-pointer">
                            <p className="hidden md:block ">Logout</p>
                            <LogOutIcon />
                        </div>
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button className="p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none">
                                <Menu className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};


export default DashboardHeader
