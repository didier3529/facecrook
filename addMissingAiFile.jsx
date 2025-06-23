function AddMissingAiFile({ personaId, onFileAdded }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setError('');
    const selected = e.target.files[0];
    if (selected && selected.type !== 'application/json') {
      setError('Only JSON files are supported.');
      setFile(null);
      return;
    }
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a JSON file.');
      return;
    }
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('personaId', personaId);
    formData.append('file', file);
    try {
      const response = await fetch('/api/ai-files', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        const { message } = await response.json().catch(() => ({}));
        throw new Error(message || 'Upload failed.');
      }
      const data = await response.json();
      onFileAdded(data);
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="add-missing-ai-file"
      aria-busy={loading}
    >
      <label htmlFor="ai-file-input">Upload AI File (JSON)</label>
      <input
        type="file"
        id="ai-file-input"
        accept=".json,application/json"
        onChange={handleFileChange}
        ref={fileInputRef}
        disabled={loading}
        aria-describedby={error ? 'ai-file-input-error' : undefined}
      />
      {error && (
        <p id="ai-file-input-error" className="error">
          {error}
        </p>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Uploading...' : 'Upload'}
      </button>
    </form>
  );
}

AddMissingAiFile.propTypes = {
  personaId: PropTypes.string.isRequired,
  onFileAdded: PropTypes.func,
};

AddMissingAiFile.defaultProps = {
  onFileAdded: () => {},
};

export default AddMissingAiFile;