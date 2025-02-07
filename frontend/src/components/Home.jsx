import React from 'react';
import { ArrowRight, Star, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section className="home min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Welcome to Our Platform
                            <span className="text-blue-600">.</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Build something amazing with our cutting-edge tools and solutions.
                            Start your journey today and join thousands of satisfied customers.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to={"/login"}>
                                <button className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                                    Login <ArrowRight className="w-4 h-4" />
                                </button>
                            </Link>
                            <button className="border cursor-pointer border-gray-300 px-6 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                        <p className="text-gray-600">Experience unprecedented speed and performance with our optimized platform.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>
                        <p className="text-gray-600">Work seamlessly with your team members in real-time with powerful collaboration tools.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                            <Star className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                        <p className="text-gray-600">Enjoy top-notch quality and reliability that sets us apart from the competition.</p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                        <p className="text-xl text-blue-100 mb-8">Join thousands of users who trust our platform.</p>
                        <Link to={"login"}>
                            <button className="bg-white cursor-pointer text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                Login Now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;