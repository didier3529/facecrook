import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { uploadAiFile } from './uploadAiFile'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

const AddMissingAiFile = ({ characterId, onFileAdded }) => {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = e => {
    setError(null)
    const selected = e.target.files[0]
    if (selected) {
      if (
        selected.type !== 'application/json' &&
        !selected.name.toLowerCase().endsWith('.json')
      ) {
        setError('Invalid file type. Please select a JSON file.')
        setFile(null)
        return
      }
      if (selected.size > MAX_FILE_SIZE) {
        setError('File is too large. Maximum size is 5MB.')
        setFile(null)
        return
      }
      setFile(selected)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload.')
      return
    }
    setIsUploading(true)
    setError(null)
    try {
      const result = await uploadAiFile(characterId, file)
      onFileAdded(result.data)
      setFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Upload failed.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <form className="add-missing-ai-file" onSubmit={handleSubmit}>
      <div className="field-group">
        <label htmlFor="ai-file-input">AI Configuration File (.json)</label>
        <input
          id="ai-file-input"
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFileChange}
          disabled={isUploading}
        />
      </div>
      {file && <div className="file-info">Selected: {file.name}</div>}
      {error && <div className="error-message">{error}</div>}
      <button type="submit" disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload File'}
      </button>
    </form>
  )
}

AddMissingAiFile.propTypes = {
  characterId: PropTypes.string.isRequired,
  onFileAdded: PropTypes.func.isRequired
}

export default AddMissingAiFile