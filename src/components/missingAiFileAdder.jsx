import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MissingAiFileAdder = ({ onAddFile }) => {
  const fileInputRef = useRef(null);
  const isMountedRef = useRef(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const handleFileChange = (e) => {
    if (!isMountedRef.current) return;
    setError("");
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["application/json", "text/plain"];
    const validExtensions = [".json", ".txt"];
    const nameLower = file.name.toLowerCase();
    const hasValidExtension = validExtensions.some(ext => nameLower.endsWith(ext));
    if (!validTypes.includes(file.type) && !hasValidExtension) {
      setError("Unsupported file type. Please upload a JSON or TXT file.");
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (!isMountedRef.current) return;
      try {
        const content = reader.result;
        const isJson = file.type === "application/json" || nameLower.endsWith(".json");
        const parsed = isJson ? JSON.parse(content) : content;
        onAddFile({ name: file.name, content: parsed });
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } catch {
        if (isMountedRef.current) {
          setError("Failed to parse file content.");
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    };
    reader.onerror = () => {
      if (isMountedRef.current) {
        setError("Error reading file.");
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="missing-ai-file-adder">
      <button
        type="button"
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        disabled={loading}
        className="add-ai-file-button"
      >
        {loading ? "Uploading..." : "Add AI File"}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,.txt"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

MissingAiFileAdder.propTypes = {
  onAddFile: PropTypes.func.isRequired,
};

export default MissingAiFileAdder;