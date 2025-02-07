import { Link } from "react-router-dom"
import { Menu } from 'lucide-react';

const DashboardHeader = () => {
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
