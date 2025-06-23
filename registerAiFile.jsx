import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const RegisterAiFile = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const allowedTypes = ['text/plain', 'application/json', 'text/csv'];

  const handleFileChange = (e) => {
    setError('');
    const selected = e.target.files[0];
    if (!selected) {
      setFile(null);
      return;
    }
    if (selected.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB.');
      setFile(null);
      return;
    }
    if (!allowedTypes.includes(selected.type)) {
      setError('Invalid file type. Allowed types: .txt, .json, .csv.');
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    if (!title.trim()) {
      setError('Please enter a title.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    try {
      setLoading(true);
      const response = await axios.post('/api/ai-files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFile(null);
      setTitle('');
      setDescription('');
      onSuccess(response.data);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Upload failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-ai-file" onSubmit={handleSubmit}>
      {error && (
        <div className="error-message" role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      <div className="form-group">
        <label htmlFor="ai-file-title">Title</label>
        <input
          id="ai-file-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ai-file-description">Description</label>
        <textarea
          id="ai-file-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="ai-file-input">Select File</label>
        <input
          id="ai-file-input"
          type="file"
          onChange={handleFileChange}
          disabled={loading}
          accept=".txt,.json,.csv"
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Register AI File'}
      </button>
    </form>
  );
};

RegisterAiFile.propTypes = {
  onSuccess: PropTypes.func,
};

RegisterAiFile.defaultProps = {
  onSuccess: () => {},
};

export default RegisterAiFile;