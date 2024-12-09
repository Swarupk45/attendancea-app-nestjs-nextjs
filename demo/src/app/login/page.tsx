"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from '../../../node_modules/next/navigation';
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { styleText } from 'util';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '@/store/userSlice';
interface LoginResponse {
    access_token: string;
}

const LoginPage: React.FC = () => {
    const router=useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [errorEmail, setEmailError] = useState<string | null>(null);
    const [errorPassword, setPasswordError] = useState<string | null>(null);
    
    const [showPassword, setShowPassword] = useState(false);
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const dispatch = useDispatch();
 
     // Update Redux state
  
    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleLogin = async () => {
        if (!validateEmail(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        } else {
            setEmailError(null);
        }

        if (!validatePassword(password)) {
            setPasswordError("Password must be at least 8 characters and include a special character.");
            return;
        } else {
            setPasswordError(null);
        }
        try {
            //NestJs => http://localhost:4000/auth/login
            const response = await axios.post('http://localhost:4000/auth/login', {
                email,
                password,
            });
            localStorage.setItem("authToken", response?.data.data.token);
            
            
           console.log("Token come in login",response?.data.data.token);
           dispatch(setUserDetails({ 
            id: response?.data.data.id, 
            role: response?.data.data.role.roleName 
          }));
          localStorage.setItem("userID",response?.data.data.id);
          localStorage.setItem("userRole",response?.data.data.role.roleName )
            const { access_token } = response.data;
            console.log("res", response.data);
            if(response?.data.data.verify=== false  ){
                console.log("false",response?.data.data.id)
                router.push(`/forgote/${response?.data.data.id}`)
            }
            else{
             
                
                    router.push("/dashboard")
                
            }
            // localStorage.setItem('token', access_token);

        } catch (err) {
            console.log("E", err)
            setError("Invalid Email or Password")
        }
    };
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setEmailError(validateEmail(value) ? null : "Please enter a valid email address.");
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordError(validatePassword(value) ? null : "Password must be at least 8 characters and include a special character.");
    };
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const isButtonDisabled = !email || !password || errorEmail !== null || errorPassword !== null;
    return (
        <div className='flex w-full h-screen'>
            <div className='w-[50%]'>
            <div className="flex flex-col items-center justify-center p-10 h-[700px]">
                <div className="w-[85%] bg-white  p-8 text-center">
                    <h1 className="font-bold text-3xl text-gray-700 mb-4">Login</h1>    
                    <div className="mt-5 text-left relative">
                       <div className='absolute ml-5 bg-white px-3'> <label htmlFor="email" className="text-lg text-gray-600">Email</label></div>
                        <input
                            type="email"
                            className="w-full outline-none border border-gray-300 h-16 rounded-lg p-3 mt-3 focus:border-blue-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className="mt-5 text-left">
                    <div className='absolute ml-5 bg-white px-3'> <label htmlFor="password" className="text-lg text-gray-600">Password</label></div>
                    <div className="relative"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <IoEyeSharp size={30} className="absolute top-7 right-10"/> : <FaEyeSlash size={30} className="absolute top-7 right-10"/>}
                            </div>
                        <input
                            type={showPassword?"text" :"password"}
                            className="w-full outline-none border border-gray-300 h-16 rounded-lg p-3 mt-3 focus:border-blue-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    
                    <button
                        className={`mt-8 font-semibold rounded-lg py-3 w-full transition duration-300 ease-in-out text-xl ${
                            !isButtonDisabled ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                        }`}
                        onClick={handleLogin}
                        disabled={isButtonDisabled}
                    >
                        Login
                    </button>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {errorEmail && <p className="text-red-500 mb-4">{errorEmail}</p>}
                    {errorPassword && <p className="text-red-500 mb-4">{errorPassword}</p>}
                </div>
            </div>
            </div>

  
            <div className='w-[50%] h-full bg-cover bg-center' style={{ backgroundImage: 'url(/att3.svg)' }}></div>
        </div>
    );
};

export default LoginPage;


// console.log("ROlleee",response?.data.data.role.roleName)
//             const { access_token } = response.data;
//             console.log("res", response.data);
//             if(response?.data.data.verify=== false  ){
//                 console.log("false",response?.data.data.id)
//                 router.push(`/forgote/${response?.data.data.id}`)
//             }
//             else{
             
//                 // router.push("/dashboard")
//             }