import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createReply } from "../../services/replies";
import { toast } from 'react-toastify';

const ReplyForm = ({ threadId, onReplySubmitted, onCancel }) => {
    const [replyContent, setReplyContent] = useState('');
    const token = useSelector(state => state.authentication.token);
    const [showReplyForm, setShowReplyForm] = useState(false);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (replyContent.trim()) {
            try {
                const reply = {
                    threadId,
                    content: replyContent.trim()
                };
                const newReply = await createReply(reply, token);

                if (newReply.status === "success") {
                    onReplySubmitted(newReply.data);
                    setReplyContent('');
                    toast.success("Reply submitted successfully");
                }
            } catch (err) {
                toast.error("Failed to submit reply: " + err.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply here..."
                className="w-full p-2 mb-4 bg-gray-700 text-white rounded"
                rows="4"
            />
            <div className="flex space-x-2">
                <button
                    type="submit"
                    className={`bg-green-500 text-white font-bold py-2 px-4 rounded ${token ? "cursor-pointer hover:bg-green-600" : "opacity-75 cursor-not-allowed"}`}
                    disabled={!token || !replyContent.trim()}
                >
                    Submit Reply
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ReplyForm;