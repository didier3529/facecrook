import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DEFAULT_AVATAR = '/images/avatar-placeholder.png';

const ListChatThreads = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    let isMounted = true;

    const fetchThreads = async () => {
      try {
        const response = await fetch('/api/chat/threads', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        if (isMounted) {
          setThreads(data);
        }
      } catch (err) {
        if (err.name !== 'AbortError' && isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchThreads();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleThreadClick = (threadId) => {
    navigate(`/chat/${threadId}`);
  };

  const handleKeyDown = (e, threadId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleThreadClick(threadId);
    }
  };

  if (loading) {
    return <div className="chat-threads-loading">Loading chat threads...</div>;
  }

  if (error) {
    return <div className="chat-threads-error">Failed to load threads: {error}</div>;
  }

  if (threads.length === 0) {
    return <div className="chat-threads-empty">No chat threads available.</div>;
  }

  return (
    <div className="chat-threads-list">
      {threads.map((thread) => (
        <div
          key={thread.id}
          className="chat-thread-item"
          role="button"
          tabIndex={0}
          onClick={() => handleThreadClick(thread.id)}
          onKeyDown={(e) => handleKeyDown(e, thread.id)}
        >
          <img
            src={thread.avatarUrl}
            alt={`${thread.title} avatar`}
            className="chat-thread-avatar"
            onError={(e) => { e.currentTarget.src = DEFAULT_AVATAR; }}
          />
          <div className="chat-thread-content">
            <div className="chat-thread-header">
              <span className="chat-thread-title">{thread.title}</span>
              <span className="chat-thread-timestamp">
                {new Date(thread.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="chat-thread-message">{thread.lastMessage}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListChatThreads;