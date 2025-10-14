import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ConfirmMissingFileAdder = ({
  isOpen,
  missingFileName = '',
  onConfirm,
  onCancel,
  title = 'Missing File Detected',
  message
}) => {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const previousActiveElement = document.activeElement
    const modalNode = modalRef.current
    const focusableSelectors =
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    const focusableElements = modalNode.querySelectorAll(focusableSelectors)
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (firstElement) {
      firstElement.focus()
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onCancel()
      } else if (e.key === 'Tab') {
        if (focusableElements.length === 0) {
          e.preventDefault()
          return
        }
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      if (previousActiveElement && previousActiveElement.focus) {
        previousActiveElement.focus()
      }
    }
  }, [isOpen, onCancel])

  if (!isOpen) return null

  const displayMessage =
    message || `The file "${missingFileName}" is missing. Would you like to add it now?`

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-missing-file-title"
      aria-describedby="confirm-missing-file-description"
    >
      <div className="modal-content" ref={modalRef}>
        <h2 id="confirm-missing-file-title">{title}</h2>
        <p id="confirm-missing-file-description">{displayMessage}</p>
        <div className="modal-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onConfirm(missingFileName)}
          >
            Add File
          </button>
        </div>
      </div>
    </div>
  )
}

ConfirmMissingFileAdder.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  missingFileName: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  title: PropTypes.string,
  message: PropTypes.string
}

export default ConfirmMissingFileAdder