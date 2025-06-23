import React, { useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const UPLOAD_ENDPOINT = process.env.REACT_APP_FILE_UPLOAD_ENDPOINT || '/api/files';

const AddMissingFile = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a file name.');
      return;
    }
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name.trim());
      formData.append('description', description.trim());

      const response = await axios.post(UPLOAD_ENDPOINT, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      onSuccess(response.data);
      setName('');
      setDescription('');
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'An error occurred while uploading.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="add-missing-file" onSubmit={handleSubmit} noValidate>
      {error && (
        <div className="add-missing-file__error" role="alert">
          {error}
        </div>
      )}
      <div className="add-missing-file__field">
        <label htmlFor="file-name">
          File Name<span aria-hidden="true">*</span>
        </label>
        <input
          id="file-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={loading}
          required
          aria-required="true"
        />
      </div>
      <div className="add-missing-file__field">
        <label htmlFor="file-description">Description</label>
        <textarea
          id="file-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          rows="3"
        />
      </div>
      <div className="add-missing-file__field">
        <label htmlFor="file-input">
          Choose File<span aria-hidden="true">*</span>
        </label>
        <input
          id="file-input"
          type="file"
          accept=".json,.csv,.txt"
          onChange={handleFileChange}
          disabled={loading}
          ref={fileInputRef}
          required
          aria-required="true"
        />
      </div>
      <button
        type="submit"
        className="add-missing-file__submit"
        disabled={loading}
      >
        {loading ? 'Uploading...' : 'Upload File'}
      </button>
    </form>
  );
};

AddMissingFile.propTypes = {
  onSuccess: PropTypes.func.isRequired,
};

export default AddMissingFile;