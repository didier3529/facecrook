import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { fetchAiResponse } from './fetchAiResponse';

const AddMissingAiEntry = ({ conversation, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const prevLengthRef = useRef(conversation.length);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const currentLength = conversation.length;
    if (currentLength > prevLengthRef.current) {
      const lastMessage = conversation[currentLength - 1];
      if (lastMessage && lastMessage.role === 'user' && !loading) {
        setLoading(true);
        fetchAiResponse(conversation)
          .then(reply => {
            if (reply) {
              onUpdate([...conversation, { role: 'ai', content: reply }]);
            }
          })
          .catch(error => {
            console.error('Error adding AI entry:', error);
          })
          .finally(() => {
            if (isMountedRef.current) {
              setLoading(false);
            }
          });
      }
      prevLengthRef.current = currentLength;
    }
  }, [conversation, onUpdate]);

  if (!loading) return null;
  return <div className="ai-typing-indicator">AI is typing...</div>;
};

AddMissingAiEntry.propTypes = {
  conversation: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.oneOf(['user', 'ai']).isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default AddMissingAiEntry;