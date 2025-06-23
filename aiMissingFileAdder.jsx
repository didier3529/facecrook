import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AIMissingFileAdder = React.memo(function AIMissingFileAdder({ missingFiles, onAddFile }) {
  const [addingFilePath, setAddingFilePath] = useState(null);
  const [errors, setErrors] = useState({});

  const handleAdd = async file => {
    // Clear previous error for this file
    setErrors(prev => {
      const next = { ...prev };
      delete next[file.path];
      return next;
    });
    setAddingFilePath(file.path);
    try {
      await onAddFile(file);
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        [file.path]: `Failed to add "${file.name}": ${err.message}`
      }));
    } finally {
      setAddingFilePath(null);
    }
  };

  if (!missingFiles.length) return null;

  return (
    <section className="ai-missing-file-adder">
      <h2>Missing Files</h2>
      <ul className="file-list">
        {missingFiles.map(file => (
          <li key={file.path} className="file-item">
            <span className="file-name">{file.name}</span>
            <button
              className="add-file-button"
              onClick={() => handleAdd(file)}
              disabled={addingFilePath === file.path}
            >
              {addingFilePath === file.path ? 'Adding...' : 'Add File'}
            </button>
            {errors[file.path] && (
              <div className="error-message">{errors[file.path]}</div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
});

AIMissingFileAdder.defaultProps = {
  missingFiles: []
};

AIMissingFileAdder.propTypes = {
  missingFiles: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      contentTemplate: PropTypes.string
    })
  ),
  onAddFile: PropTypes.func.isRequired
};

export default AIMissingFileAdder;