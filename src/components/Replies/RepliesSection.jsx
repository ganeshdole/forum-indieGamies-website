import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getRepliesByThreadId } from "../../services/replies";
import ReplyComponent from './Reply';

const RepliesSection = ({ threadId, onRepliesUpdate }) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-white">Loading replies...</div>;
  }


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Replies:</h2>
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