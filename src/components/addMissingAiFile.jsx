import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

const AddMissingAiFile = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const isMounted = useRef(true)
  const controllerRef = useRef(null)

  useEffect(() => {
    return () => {
      isMounted.current = false
      if (controllerRef.current) {
        controllerRef.current.abort()
      }
    }
  }, [])

  const handleFileChange = (e) => {
    if (!isMounted.current) return
    setFile(e.target.files[0])
    setError('')
    setSuccess(false)
    setProgress(0)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      setError('Please select a file to upload.')
      return
    }

    const formData = new FormData()
    formData.append('aiFile', file)

    const controller = new AbortController()
    controllerRef.current = controller

    try {
      if (isMounted.current) {
        setUploading(true)
        setError('')
      }
      const response = await axios.post('/api/ai-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (isMounted.current && e.total) {
            const percent = Math.round((e.loaded * 100) / e.total)
            setProgress(percent)
          }
        },
        signal: controller.signal
      })
      if (isMounted.current) {
        setSuccess(true)
        if (onUploadSuccess) {
          onUploadSuccess(response.data)
        }
      }
    } catch (err) {
      if (isMounted.current) {
        if (axios.isCancel(err)) {
          setError('Upload canceled.')
        } else {
          setError(err.response?.data?.message || 'Upload failed. Please try again.')
        }
      }
    } finally {
      if (isMounted.current) {
        setUploading(false)
      }
      controllerRef.current = null
    }
  }

  return (
    <div className="add-missing-ai-file">
      <h2>Add Missing AI File</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="file-input">Choose AI file:</label>
        <input
          id="file-input"
          type="file"
          accept=".json,.txt,.env"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <button type="submit" disabled={uploading}>
          {uploading ? `Uploading (${progress}%)` : 'Upload File'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">File uploaded successfully.</p>}
    </div>
  )
}

AddMissingAiFile.propTypes = {
  onUploadSuccess: PropTypes.func
}

AddMissingAiFile.defaultProps = {
  onUploadSuccess: null
}

export default AddMissingAiFile