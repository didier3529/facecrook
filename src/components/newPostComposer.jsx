import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../App';

const MAX_CHAR = 280;

const NewPostComposer = () => {
  const { user, setUser } = useContext(UserContext);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const isMountedRef = useRef(true);

  useEffect(() => () => {
      isMountedRef.current = false;
    }, []);

  const handleContentChange = e => {
    const {value} = e.target;
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
    setIsSubmitting(true);
    setError('');
    try {
      // Simulate posting to feed (since this is a satirical app)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock successful post creation
      const newPost = {
        id: `post_${Date.now()}`,
        author: user.name,
        content: content.trim(),
        timestamp: new Date().toISOString(),
        likes: 0,
        tips: 0,
        media: file ? URL.createObjectURL(file) : null,
      };

      // Post created successfully - no token cost
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
        <span className="post-info">Free posting!</span>
        <button type="submit" disabled={isSubmitting || !content.trim()}>
          {isSubmitting ? 'Posting...' : 'Post'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default NewPostComposer;
