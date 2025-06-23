import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const PlanConfirmationAiFileAdder = ({ onFilesChange, maxFiles, maxFileSizeMB, acceptedTypes }) => {
  const [files, setFiles] = useState([]) // array of { id, file }
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const validateFile = (file, currentCount) => {
    if (acceptedTypes.length && !acceptedTypes.includes(file.type)) {
      return `Unsupported file type: ${file.name}`
    }
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      return `File too large (${maxFileSizeMB}MB max): ${file.name}`
    }
    if (currentCount + 1 > maxFiles) {
      return `Cannot add more than ${maxFiles} files`
    }
    return null
  }

  const handleFiles = selectedFiles => {
    let newFiles = [...files]
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i]
      const validationError = validateFile(file, newFiles.length)
      if (validationError) {
        setError(validationError)
        return
      }
      const id = `${file.name}-${file.lastModified}-${Math.random().toString(36).substr(2, 9)}`
      newFiles.push({ id, file })
    }
    setFiles(newFiles)
    setError('')
    onFilesChange && onFilesChange(newFiles.map(fObj => fObj.file))
  }

  const handleInputChange = e => {
    handleFiles(e.target.files)
    e.target.value = ''
  }

  const handleDrop = e => {
    e.preventDefault()
    e.dataTransfer.files && handleFiles(e.dataTransfer.files)
  }

  const handleDragOver = e => e.preventDefault()

  const handleZoneKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      fileInputRef.current.click()
    }
  }

  const removeFile = index => {
    const newFiles = files.filter((_, i) => i !== index)
    setFiles(newFiles)
    setError('')
    onFilesChange && onFilesChange(newFiles.map(fObj => fObj.file))
  }

  return (
    <div className="fc-ai-file-adder">
      <div
        className="fc-drop-zone"
        role="button"
        tabIndex="0"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current.click()}
        onKeyDown={handleZoneKeyDown}
      >
        <p>Drag & drop files here, or click to browse</p>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleInputChange}
          accept={acceptedTypes.join(',')}
        />
      </div>
      {error && <div className="fc-error">{error}</div>}
      {files.length > 0 && (
        <ul className="fc-file-list">
          {files.map((fileObj, idx) => (
            <li key={fileObj.id} className="fc-file-item">
              <span className="fc-file-name">{fileObj.file.name}</span>
              <button
                type="button"
                className="fc-remove-btn"
                onClick={() => removeFile(idx)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

PlanConfirmationAiFileAdder.propTypes = {
  onFilesChange: PropTypes.func,
  maxFiles: PropTypes.number,
  maxFileSizeMB: PropTypes.number,
  acceptedTypes: PropTypes.arrayOf(PropTypes.string)
}

PlanConfirmationAiFileAdder.defaultProps = {
  onFilesChange: null,
  maxFiles: 5,
  maxFileSizeMB: 10,
  acceptedTypes: ['application/pdf', 'image/png', 'image/jpeg']
}

export default PlanConfirmationAiFileAdder