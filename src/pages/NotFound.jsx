import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white px-4">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-8xl font-bold text-blue-500 mb-4">404</h1>
                <p className="text-3xl mb-8">Oops! Page not found</p>
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-xl mb-8 text-center max-w-md"
            >
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </motion.p>

            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link
                    to="/"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-lg"
                >
                    Return to Homepage
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;