const AddMissingFile = ({ onUploadSuccess, apiUrl }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain'
  ];
  const maxSize = 10 * 1024 * 1024; // 10MB

  const handleFileChange = e => {
    setError('');
    const selected = e.target.files[0];
    if (!selected) {
      setFile(null);
      setPreviewUrl('');
      return;
    }
    if (!allowedTypes.includes(selected.type)) {
      setError('Unsupported file type.');
      return;
    }
    if (selected.size > maxSize) {
      setError('File size exceeds 10MB.');
      return;
    }
    setFile(selected);
    setFilename(selected.name);
    if (selected.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(selected);
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!apiUrl) {
      setError('API URL is not configured.');
      return;
    }
    if (!file) {
      setError('Please select a file.');
      return;
    }
    setUploading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    try {
      const response = await axios.post(
        `${apiUrl}/files/upload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      onUploadSuccess(response.data);
      setFile(null);
      setFilename('');
      setPreviewUrl('');
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-missing-file">
      <form onSubmit={handleSubmit} className="file-form">
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="fileInput">Select File</label>
          <input
            id="fileInput"
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.pdf,.txt"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </div>
        {previewUrl && (
          <div className="preview">
            <img src={previewUrl} alt="Preview" />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="filenameInput">Filename / Description</label>
          <input
            id="filenameInput"
            type="text"
            value={filename}
            onChange={e => setFilename(e.target.value)}
            disabled={uploading}
          />
        </div>
        <button
          type="submit"
          disabled={uploading || !file}
          className="upload-button"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
};

AddMissingFile.propTypes = {
  onUploadSuccess: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired
};

export default AddMissingFile;