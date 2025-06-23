import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AddMissingAiFiles = () => {
  const [missingFiles, setMissingFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setLoading(true);
    setError(null);
    Promise.all([
      fetch('/api/ai/files/expected', { signal }),
      fetch('/api/ai/files/existing', { signal })
    ])
      .then(([resExpected, resExisting]) => {
        if (!resExpected.ok) throw new Error('Expected files fetch failed');
        if (!resExisting.ok) throw new Error('Existing files fetch failed');
        return Promise.all([resExpected.json(), resExisting.json()]);
      })
      .then(([expected, existing]) => {
        const missing = expected.filter(name => !existing.includes(name));
        setMissingFiles(missing);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load AI files');
        }
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, []);

  const handleAddMissing = async () => {
    setAdding(true);
    setError(null);
    setSuccess(null);
    try {
      for (const fileName of missingFiles) {
        const res = await fetch('/api/ai/files', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileName })
        });
        if (!res.ok) throw new Error(`Failed to add ${fileName}`);
      }
      setSuccess('All missing AI files have been added.');
      setMissingFiles([]);
    } catch (err) {
      setError(err.message || 'Error adding missing files');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <div>Loading AI file status...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h2>AI Files Status</h2>
      {missingFiles.length === 0 ? (
        <p>All AI files are present.</p>
      ) : (
        <div>
          <p>The following AI files are missing:</p>
          <ul>
            {missingFiles.map(name => (
              <li key={name}>{name}</li>
            ))}
          </ul>
          <button type="button" onClick={handleAddMissing} disabled={adding}>
            {adding ? 'Adding...' : 'Add Missing AI Files'}
          </button>
        </div>
      )}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

AddMissingAiFiles.propTypes = {};

export default AddMissingAiFiles;