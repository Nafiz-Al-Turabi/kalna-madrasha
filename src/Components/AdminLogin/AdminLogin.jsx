import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Provider/AuthProvider';


const AdminLogin = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/admin/dashboard');
        } catch (error) {
            setError('Invalid email or password');
            console.error('Login error:', error);
        }
    };

    


    return (
        <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="admin inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg lg:w-full">
                    <div className=" bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <button
                                    onClick={onClose}
                                    className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-600"
                                >
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <h3 className="text-lg text-center leading-6 font-medium text-gray-900" id="modal-title">
                                    Login
                                </h3>
                                <div className="mt-2">
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div>
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                User Email
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    name="email"
                                                    type="text"
                                                    autoComplete="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#DAA520] focus:border-[#DAA520] sm:text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    required
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#DAA520] focus:border-[#DAA520] sm:text-sm"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <button
                                                type="submit"
                                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#DDA520] hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DAA520]"
                                            >
                                                Sign in
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
