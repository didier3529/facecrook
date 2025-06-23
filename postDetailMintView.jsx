import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { mintPostNFT } from '../services/nftService';

function PostDetailMintView() {
  const { postId } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minting, setMinting] = useState(false);
  const [mintResult, setMintResult] = useState(null);
  const [mintError, setMintError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setMintResult(null);
    setMintError(null);
    async function fetchPost() {
      try {
        const response = await fetch(`/api/posts/${postId}`);
        if (!response.ok) throw new Error('Failed to load post');
        const data = await response.json();
        if (isMounted) setPost(data);
      } catch (err) {
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchPost();
    return () => {
      isMounted = false;
    };
  }, [postId]);

  const handleMint = async () => {
    if (!isAuthenticated) return;
    setMinting(true);
    setMintError(null);
    try {
      const result = await mintPostNFT(postId);
      setMintResult(result);
    } catch (err) {
      setMintError(err.message || 'Minting failed');
    } finally {
      setMinting(false);
    }
  };

  if (loading) return <div className="post-detail-loading">Loading post...</div>;
  if (error) return <div className="post-detail-error">Error: {error}</div>;

  return (
    <div className="post-detail-mint-view">
      <h2>{post.title}</h2>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="post-detail-image"
        />
      )}
      <p>{post.content}</p>
      {!isAuthenticated && (
        <div className="login-prompt">
          <Link to="/login">Log in</Link> to mint this post as an NFT.
        </div>
      )}
      {isAuthenticated && !mintResult && (
        <button
          onClick={handleMint}
          disabled={minting}
          className="mint-button"
        >
          {minting ? 'Minting...' : 'Mint as NFT'}
        </button>
      )}
      {mintError && <div className="mint-error">Error: {mintError}</div>}
      {mintResult && (
        <div className="mint-success">
          <p>Successfully minted NFT!</p>
          <p>Token ID: {mintResult.tokenId}</p>
          {mintResult.tokenUrl && (
            <a
              href={mintResult.tokenUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View your NFT
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default PostDetailMintView;