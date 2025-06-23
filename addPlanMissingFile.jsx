import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

function AddPlanMissingFile({ planId, onUpload, onCancel }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setError('');
    const selected = e.target.files[0];
    if (!selected) {
      setFile(null);
      return;
    }
    const validTypes = ['application/json', 'text/csv'];
    if (!validTypes.includes(selected.type)) {
      setError('Invalid file type. Please upload a JSON or CSV file.');
      setFile(null);
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError('File is too large. Max size is 5MB.');
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file before uploading.');
      return;
    }
    setError('');
    try {
      const result = onUpload(file);
      if (result && typeof result.then === 'function') {
        result
          .then(() => {
            setFile(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = null;
            }
          })
          .catch((err) => {
            setError(err.message || 'Upload failed. Please try again.');
          });
      } else {
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      }
    } catch (err) {
      setError(err.message || 'Upload failed. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="upload-dialog-title"
      >
        <h2 id="upload-dialog-title">Upload Missing Plan File</h2>
        <p>
          No file found for plan <strong>{planId}</strong>. Please upload a plan
          file to continue.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="plan-file-input">
            Select file (JSON or CSV, max 5MB):
          </label>
          <input
            id="plan-file-input"
            type="file"
            accept=".json,.csv,application/json,text/csv"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          {error && <p className="error">{error}</p>}
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!file}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

AddPlanMissingFile.propTypes = {
  planId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onUpload: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default AddPlanMissingFile;