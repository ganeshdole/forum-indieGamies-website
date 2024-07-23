import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import { deleteReply } from "../../services/replies";
import { toast } from 'react-toastify';

const ReplyComponent = ({ reply, onDelete }) => {
    const [isCreator, setIsCreator] = useState(false);
    const userId = useSelector(state => state.user.userId);
    const token = useSelector(state => state.authentication.token);

    useEffect(() => {
        if (userId === reply.userId) {
            setIsCreator(true);
        } else {
            setIsCreator(false);
        }
    }, [reply, userId]);

    const handleDeleteReply = async () => {
        const result = await deleteReply(reply._id, token);
        if (result.status === "success") {
            toast.success(result.data);
            onDelete()
        } else {
            toast.error(result.error);
        }
    };

    const calculateTimeDifference = (replyDate) => {
        const currentDate = new Date();
        const differenceInMillis = currentDate - new Date(replyDate);

        const differenceInDays = Math.floor(differenceInMillis / (1000 * 60 * 60 * 24));
        const differenceInHours = Math.floor((differenceInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        return { differenceInDays, differenceInHours };
    };

    const { differenceInDays, differenceInHours } = calculateTimeDifference(reply.date);

    return (
        <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-200 mb-4">{reply.content}</p>
            <div className="flex justify-between items-center">
                <div className="flex gap-2 text-sm text-gray-500">
                    <span>by {reply.author}</span>
                    {differenceInDays === 0 ? (
                        <span>{` ${differenceInHours} hours ago`}</span>
                    ) : (
                        <span>{` ${differenceInDays} days and ${differenceInHours} hours ago`}</span>
                    )}
                </div>
                {isCreator && (
                    <button
                        onClick={handleDeleteReply}
                        className="text-gray-500 hover:text-red-500 transition-colors"
                        aria-label="Delete reply"
                    >
                        <Trash2 size={20} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default ReplyComponent;