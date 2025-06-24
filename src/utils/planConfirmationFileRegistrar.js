import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { AuthContext } from '../contexts/AuthContext'

function PlanConfirmationFileRegistrar({ planId, onUploadSuccess }) {
  const { authToken } = useContext(AuthContext)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl('')
      return undefined
    }
    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const handleFileChange = e => {
    setError('')
    setSuccess('')
    const file = e.target.files[0]
    if (!file) return
    const maxSizeMB = 10
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB} MB limit.`)
      return
    }
    setSelectedFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file before uploading.')
      return
    }
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const response = await axios.post(
        `/api/plans/${planId}/files`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      )
      setSuccess('File uploaded successfully.')
      setSelectedFile(null)
      if (onUploadSuccess) onUploadSuccess(response.data)
    } catch (err) {
      const msg =
        err.response?.data?.message || 'Upload failed. Please try again.'
      setError(msg)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setSelectedFile(null)
    setError('')
    setSuccess('')
  }

  return (
    <div className="file-registrar-container">
      <label htmlFor="plan-file-input" className="file-input-label">
        {selectedFile ? 'Change File' : 'Select File'}
      </label>
      <input
        id="plan-file-input"
        type="file"
        accept=".jpg,.png,.pdf,.docx"
        onChange={handleFileChange}
        disabled={uploading}
        className="file-input"
      />
      {previewUrl && selectedFile.type.startsWith('image/') && (
        <img
          src={previewUrl}
          alt="preview"
          className="file-preview-image"
        />
      )}
      {selectedFile && !selectedFile.type.startsWith('image/') && (
        <div className="file-preview-name">{selectedFile.name}</div>
      )}
      <div className="file-registrar-actions">
        {selectedFile && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={uploading}
            className="btn remove-btn"
          >
            Remove
          </button>
        )}
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading}
          className="btn upload-btn"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {error && <div className="file-registrar-error">{error}</div>}
      {success && <div className="file-registrar-success">{success}</div>}
    </div>
  )
}

PlanConfirmationFileRegistrar.propTypes = {
  planId: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func
}

PlanConfirmationFileRegistrar.defaultProps = {
  onUploadSuccess: null
}

export default PlanConfirmationFileRegistrar
