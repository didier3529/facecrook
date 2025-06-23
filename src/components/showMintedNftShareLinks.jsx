import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaTwitter, FaFacebook, FaLinkedin, FaEnvelope, FaLink } from 'react-icons/fa';

const ShowMintedNftShareLinks = ({ shareUrl, title, description, hashtags }) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const timeoutRef = useRef();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const text = title || '';
  const hashParam = Array.isArray(hashtags) && hashtags.length
    ? `&hashtags=${encodeURIComponent(hashtags.join(','))}`
    : '';
  const emailBody = `${description || ''}\n\n${shareUrl}`;

  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}${hashParam}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(text)}&summary=${encodeURIComponent(description || '')}`;
  const emailUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(emailBody)}`;

  const performCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(shareUrl);
    } else {
      return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          if (document.execCommand('copy')) {
            resolve();
          } else {
            reject(new Error('Copy command failed'));
          }
        } catch (err) {
          reject(err);
        } finally {
          document.body.removeChild(textarea);
        }
      });
    }
  };

  const handleCopy = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    performCopy()
      .then(() => {
        setCopied(true);
        timeoutRef.current = setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error('Copy failed', err);
        setCopyError(true);
        timeoutRef.current = setTimeout(() => {
          setCopyError(false);
        }, 2000);
      });
  };

  const copyButtonText = copyError
    ? 'Error'
    : copied
      ? 'Copied!'
      : 'Copy Link';

  return (
    <div className="share-links-container">
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="share-link twitter">
        <FaTwitter /> Twitter
      </a>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="share-link facebook">
        <FaFacebook /> Facebook
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="share-link linkedin">
        <FaLinkedin /> LinkedIn
      </a>
      <a href={emailUrl} className="share-link email">
        <FaEnvelope /> Email
      </a>
      <button onClick={handleCopy} className="share-link copy-button">
        <FaLink /> {copyButtonText}
      </button>
    </div>
  );
};

ShowMintedNftShareLinks.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  hashtags: PropTypes.arrayOf(PropTypes.string),
};

ShowMintedNftShareLinks.defaultProps = {
  title: '',
  description: '',
  hashtags: [],
};

export default ShowMintedNftShareLinks;