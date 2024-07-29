import React, { useState, useEffect } from 'react';
import { getThreads } from '../services/threads';
import ThreadCard from '../components/Threads/ThreadCard';
import { Loader, Plus, RefreshCw, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Threads = () => {
    const [threads, setThreads] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const fetchThreads = async () => {
        setIsLoading(true);
        try {
            const result = await getThreads(page);
            if (result.status === "success") {
                setThreads(result.data);
            } else {
                toast.error("Failed to fetch threads");
            }
        } catch (error) {
            toast.error(`Error fetching threads: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchThreads();
    }, [page]);

    const handleNewThread = () => {
        navigate('/thread/new');
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
             <section className="bg-gradient-to-br from-indigo-800 to-purple-900 flex flex-col justify-center items-center p-8 min-h-[250px]">
                <div className="max-w-3xl w-full text-center">
                    <h1 className="font-teko text-5xl font-extrabold text-white uppercase mb-2" style={{ fontFamily: "Teko-Bold" }}>
                        Threads
                    </h1>
                    <p className="font-teko text-xl text-white uppercase" style={{ fontFamily: "Teko-Medium" }}>
                        Explore all discussions and connect with the community
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold">All Discussions</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={fetchThreads}
                            className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                        >
                            <RefreshCw className="w-4 h-4 mr-2" />
                            <span className="text-sm">Refresh</span>
                        </button>
                        <button
                            onClick={handleNewThread}
                            className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            <span className="text-sm">New Thread</span>
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader className="animate-spin text-indigo-600" size={48} />
                    </div>
                ) : (
                    <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
                        {threads.length > 0 ? (
                            threads.map((thread, index) => (
                                <ThreadCard
                                    key={thread._id}
                                    thread={thread}
                                    isLast={index === threads.length - 1}
                                />
                            ))
                        ) : (
                            <div className="text-center py-8 text-gray-400">
                                No threads found. Start a new discussion!
                            </div>
                        )}
                    </div>
                )}

                <div className="flex justify-between mt-8">
                    {(page !==1) &&<button
                        onClick={() => setPage(prevPage => Math.max(prevPage - 1, 1))}
                        disabled={page === 1}
                        className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Previous
                    </button>}
                    {(threads.length === 10) &&<button
                        onClick={() => setPage(prevPage => prevPage + 1)}
                        className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
                    >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </button>}
                </div>
            </main>
        </div>
    );
};

export default Threads;