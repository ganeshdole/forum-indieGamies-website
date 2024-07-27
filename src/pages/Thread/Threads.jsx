import React, { useEffect, useState, useCallback } from "react";
import { Loader, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getThreadById, updateThread, deleteThread } from "../../services/threads";
import { getCategoryById } from "../../services/categories";
import { toast } from "react-toastify";

import RepliesSection from "../../components/Replies/RepliesSection";

const Threads = () => {
    const token = useSelector(state => state.authentication.token);
    const userId = useSelector(state => state.user.userId);
    const navigate = useNavigate();
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isCreator, setIsCreator] = useState(false);

    const fetchThreadData = useCallback(async () => {
        try {
            const threadResult = await getThreadById(threadId);
            setThread(threadResult);
           
            if (threadResult?.category) {
                const categoryResult = await getCategoryById(threadResult.category);
                setCategory(categoryResult.data);
            }

            await updateThread(threadId, {
                ...threadResult,
                views: (threadResult.views || 0) + 1
            });

            setIsCreator(userId === threadResult.userId);
        } catch (err) {
            setError(err.message);
            toast.error(`Failed to fetch thread data: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }, [threadId, userId]);

    useEffect(() => {
        fetchThreadData();
    }, [fetchThreadData]);

    const handleRepliesUpdate = useCallback((replyCount) => {
        setThread(prevThread => ({
            ...prevThread,
            replies: replyCount
        }));
    }, []);

    const handleDeleteThread = async () => {
        if (window.confirm("Are you sure you want to delete this thread?")) {
            try {
                const result = await deleteThread(threadId, token);
                if (result.status === "success") {
                    toast.success("Thread Deleted");
                    navigate("/");
                } else {
                    throw new Error(result.error);
                }
            } catch (err) {
                toast.error(`Failed to delete thread: ${err.message}`);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-indigo-600" size={48} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="text-white text-xl">Error: {error}</div>
            </div>
        );
    }

    if (!thread) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="text-white text-xl">Thread not found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <div className="bg-gray-800 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-4">
                        {category && (
                            <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded-full mb-2">
                                {category.name}
                            </span>
                        )}
                        <h1 className="text-xl sm:text-2xl font-bold">{thread.title}</h1>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <div>
                            <span>Posted by {thread.author}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date(thread.createdAt).toLocaleString()}</span>
                            <span className="mx-2">•</span>
                            <span>{thread.views} views</span>
                            <span className="mx-2">•</span>
                            <span>{thread.replies} replies</span>
                        </div>
                        {isCreator && (
                            <div className="space-x-2">
                                <button
                                    onClick={handleDeleteThread}
                                    className="text-gray-500 hover:text-red-500 transition-colors p-2 rounded"
                                    aria-label="Delete thread"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <p className="text-lg whitespace-pre-wrap">
                        {thread.description}
                    </p>
                </div>
            
                <RepliesSection threadId={threadId} onRepliesUpdate={handleRepliesUpdate} />
            </div>
        </div>
    );
};

export default Threads;