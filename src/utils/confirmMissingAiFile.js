import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const ConfirmMissingAiFile = ({ isOpen, fileName, onConfirm, onCancel }) => {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;
    previouslyFocusedElement.current = document.activeElement;
    modalRef.current.focus({ preventScroll: true });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCancel();
      }
      if (e.key === 'Tab') {
        const focusable = modalRef.current.querySelectorAll('button');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (previouslyFocusedElement.current) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      onCancel();
    }
  };

  return (
    <div
      className="confirm-missing-ai-file__overlay"
      role="button"
      tabIndex="0"
      ref={overlayRef}
      onClick={handleOverlayClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleOverlayClick(e);
        }
      }}
    >
      <div
        className="confirm-missing-ai-file__modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-missing-ai-file-title"
        aria-describedby="confirm-missing-ai-file-desc"
        ref={modalRef}
        tabIndex="-1"
      >
        <h2
          id="confirm-missing-ai-file-title"
          className="confirm-missing-ai-file__title"
        >
          Missing AI File
        </h2>
        <p
          id="confirm-missing-ai-file-desc"
          className="confirm-missing-ai-file__message"
        >
          The AI file {fileName} is missing. Would you like to generate it now?
        </p>
        <div className="confirm-missing-ai-file__actions">
          <button
            type="button"
            className="confirm-missing-ai-file__button confirm-missing-ai-file__button--cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="confirm-missing-ai-file__button confirm-missing-ai-file__button--confirm"
            onClick={onConfirm}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

ConfirmMissingAiFile.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  fileName: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmMissingAiFile;
