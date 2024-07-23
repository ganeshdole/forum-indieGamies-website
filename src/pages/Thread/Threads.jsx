import React, { useEffect, useState } from "react";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getThreadById, updateThread } from "../../services/threads";
import { getCategoryById } from "../../services/categories";
import { toast } from "react-toastify";
import RepliesSection from "../../components/Replies/RepliesSection";
import ReplyForm from "../../components/Replies/ReplyForm";

const Threads = () => {
    const token = useSelector(state => state.authentication.token);
    const { threadId } = useParams();
    const [thread, setThread] = useState(null);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showReplyForm, setShowReplyForm] = useState(false);

    const fetchThreadData = async () => {
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
        } catch (err) {
            setError(err.message);
            toast.error("Failed to fetch thread data: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchThreadData();
    }, [threadId]);

    const handleReplySubmitted = (newReply) => {
        setShowReplyForm(false);
        setThread(prevThread => ({
            ...prevThread,
            replies: (prevThread.replies || 0) + 1
        }));
    };

    const handleRepliesUpdate = (replyCount) => {
        setThread(prevThread => ({
            ...prevThread,
            replies: replyCount
        }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin text-indigo-600" size={48} />
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
            {/* Thread Header */}
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
                    <div className="flex items-center text-sm text-gray-400">
                        <span>Posted by {thread.author}</span>
                        <span className="mx-2">•</span>
                        <span>{thread.views} views</span>
                        <span className="mx-2">•</span>
                        <span>{thread.replies} replies</span>
                    </div>
                </div>
            </div>

            {/* Thread Content */}
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <p className="text-lg">
                        {thread.description}
                    </p>
                </div>

                {/* Reply Button */}
                {!showReplyForm && <div className="mb-8">
                    <button
                        onClick={() => setShowReplyForm(!showReplyForm)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                    Reply to Thread
                    </button>
                </div>}

                {/* Reply Form */}
                {showReplyForm && (
                    <ReplyForm
                        threadId={threadId}
                        onReplySubmitted={handleReplySubmitted}
                        onCancel={() => setShowReplyForm(false)}
                    />
                )}
                {/* Replies */}
                <RepliesSection threadId={threadId} onRepliesUpdate={handleRepliesUpdate} />
            </div>
        </div>
    );
};

export default Threads;