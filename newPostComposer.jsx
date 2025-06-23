import React, { useState, useEffect, useRef, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { FeedContext } from '../contexts/FeedContext';

const MAX_CHAR = 280;
const TOKEN_COST = 10;

const NewPostComposer = () => {
  const { user, dispatch: userDispatch } = useContext(UserContext);
  const { dispatch: feedDispatch } = useContext(FeedContext);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleContentChange = e => {
    const value = e.target.value;
    if (value.length <= MAX_CHAR) {
      setContent(value);
      setError('');
    }
  };

  const handleFileChange = e => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setError('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Post cannot be empty.');
      return;
    }
    if (user.tokens < TOKEN_COST) {
      setError('Insufficient tokens.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('content', content.trim());
      if (file) formData.append('media', file);
      const resp = await fetch('/api/posts', {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` },
        body: formData
      });
      if (!resp.ok) {
        let errMsg = 'Failed to create post.';
        try {
          const errData = await resp.json();
          errMsg = errData.message || errMsg;
        } catch {}
        throw new Error(errMsg);
      }
      const newPost = await resp.json();
      feedDispatch({ type: 'ADD_POST', payload: newPost });
      userDispatch({ type: 'DEDUCT_TOKENS', payload: TOKEN_COST });
      if (isMountedRef.current) {
        setContent('');
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err.message || 'An error occurred.');
      }
    } finally {
      if (isMountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form className="new-post-composer" onSubmit={handleSubmit}>
      <textarea
        aria-label="Compose new post"
        placeholder="What's crookin'?"
        value={content}
        onChange={handleContentChange}
        disabled={isSubmitting}
      />
      <div className="composer-controls">
        <label className="file-upload">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isSubmitting}
          />
          Attach Image
        </label>
        <span className="char-count">
          {content.length}/{MAX_CHAR}
        </span>
        <span className="token-cost">Cost: {TOKEN_COST} CROC</span>
        <button type="submit" disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default NewPostComposer;