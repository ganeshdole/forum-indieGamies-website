import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getRepliesByThreadId } from "../../services/replies";
import ReplyComponent from './Reply';
import ReplyForm from './ReplyForm';

const RepliesSection = ({ threadId, onRepliesUpdate }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(false);

  const fetchReplies = async () => {
    try {
      setLoading(true);
      const repliesResult = await getRepliesByThreadId(threadId);
      setReplies(repliesResult.data);
      onRepliesUpdate(repliesResult.data.length);
    } catch (err) {
      toast.error("Failed to fetch replies: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, [threadId]);

  function onDelete(){
    fetchReplies();
  }

  const handleReplySubmitted = (newReply) => {
    setShowReplyForm(false);
    fetchReplies();
  };

  if (loading) {
    return <div className="text-white">Loading replies...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Replies:</h2>
      
      {/* Reply Button */}
      {!showReplyForm && (
        <div className="mb-8">
          <button
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Reply to Thread
          </button>
        </div>
      )}

      {/* Reply Form */}
      {showReplyForm && (
        <ReplyForm
          threadId={threadId}
          onReplySubmitted={handleReplySubmitted}
          onCancel={() => setShowReplyForm(false)}
        />
      )}

      {replies.length > 0 ? (
        replies.map(reply => (
          <ReplyComponent key={reply._id} reply={reply} onDelete={onDelete}/>
        ))
      ) : (
        <div className="bg-gray-800 rounded-lg p-6">
          <p className="text-gray-400 mb-4">
            There are no replies yet. Be the first to reply!
          </p>
        </div>
      )}
    </div>
  );
};

export default RepliesSection;