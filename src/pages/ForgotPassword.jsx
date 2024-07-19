import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Send, Check, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { requestOtp, verifyOtp } from "../services/forgortPassword";
import { updateUser } from "../services/user"


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState('email'); 
    const [tempToken, setTempToken] = useState(null);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const result = await requestOtp(email);
        if (result.status === "success") {
            toast.success("OTP sent to your email");
            setStep('otp');
        } else {
            toast.error(result.error);
        }
    }

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        const result = await verifyOtp(email, otp);
        console.log(result);
        if (result.status === "success") {
            setTempToken(result.data.token);
            toast.success("OTP verified successfully");
            setStep('password');
        } else {
            toast.error(result.error);
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const user = {
            password
        }
        const result = await updateUser(user, tempToken);
        if (result.status === "success") {
            toast.success("Password reset successfully");
            navigate('/login');
        } else {
            toast.error(result.error);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 p-4 relative">
            <button
                onClick={() => navigate("/login")}
                className="absolute top-4 left-4 flex items-center text-gray-300 hover:text-white transition-colors duration-200"
            >
                <ArrowLeft className="mr-2" size={20} />
                <span>Back to Sign In</span>
            </button>
            <section className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h2 className="text-4xl font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
                    Forgot Password
                </h2>
                <p className="text-gray-400 text-center mb-6">
                    {step === 'email' && "Enter your email address and we'll send you an OTP."}
                    {step === 'otp' && "Enter the OTP sent to your email."}
                    {step === 'password' && "Enter your new password."}
                </p>
                <form className="space-y-6" onSubmit={
                    step === 'email' ? handleSendOtp :
                        step === 'otp' ? handleVerifyOtp :
                            handleResetPassword
                }>
                    {step === 'email' && (
                        <div>
                            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="email">
                                Email
                            </label>
                            <div className='relative'>
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-white"
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    aria-label="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}
                    {step === 'otp' && (
                        <div>
                            <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="otp">
                                OTP
                            </label>
                            <div className='relative'>
                                <Check className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-white"
                                    id="otp"
                                    type="text"
                                    placeholder="Enter OTP"
                                    aria-label="OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    )}
                    {step === 'password' && (
                        <>
                            <div>
                                <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="password">
                                    New Password
                                </label>
                                <div className='relative'>
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-white"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        aria-label="New Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-semibold mb-2" htmlFor="confirmPassword">
                                    Confirm New Password
                                </label>
                                <div className='relative'>
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                    <input
                                        className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-white"
                                        id="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        aria-label="Confirm New Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </>
                    )}
                    <div>
                        <button
                            className="w-full flex items-center justify-center bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out"
                            type="submit"
                        >
                            {step === 'email' && (
                                <>
                                    <Send className="mr-2" size={18} />
                                    Send OTP
                                </>
                            )}
                            {step === 'otp' && (
                                <>
                                    <Check className="mr-2" size={18} />
                                    Verify OTP
                                </>
                            )}
                            {step === 'password' && (
                                <>
                                    <Lock className="mr-2" size={18} />
                                    Reset Password
                                </>
                            )}
                        </button>
                    </div>
                </form>
                <p className="mt-8 text-center text-gray-400">
                    Remember your password?{' '}
                    <Link to="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition">
                        Sign in
                    </Link>
                </p>
            </section>
        </main>
    );
};

export default ForgotPassword;