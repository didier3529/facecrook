import React, { useEffect, useRef, useContext } from 'react'
import { FeedContext } from './FeedContext'
import PostComposer from './PostComposer'
import PostCard from './PostCard'

const PostCardInfiniteScroller = () => {
  const {
    posts,
    currentPage,
    totalPages,
    loadPage,
    loading,
    error
  } = useContext(FeedContext)

  const sentinelRef = useRef(null)
  const observerRef = useRef(null)

  // Refs to keep latest values for observer callback
  const loadingRef = useRef(loading)
  useEffect(() => { loadingRef.current = loading }, [loading])

  const currentPageRef = useRef(currentPage)
  useEffect(() => { currentPageRef.current = currentPage }, [currentPage])

  const totalPagesRef = useRef(totalPages)
  useEffect(() => { totalPagesRef.current = totalPages }, [totalPages])

  const loadPageRef = useRef(loadPage)
  useEffect(() => { loadPageRef.current = loadPage }, [loadPage])

  // Initial load
  useEffect(() => {
    loadPage(1)
  }, [loadPage])

  // Initialize IntersectionObserver once
  useEffect(() => {
    if (!sentinelRef.current) return
    observerRef.current = new IntersectionObserver(entries => {
      const entry = entries[0]
      if (
        entry.isIntersecting &&
        !loadingRef.current &&
        currentPageRef.current < totalPagesRef.current
      ) {
        loadPageRef.current(currentPageRef.current + 1)
      }
    }, {
      root: null,
      rootMargin: '200px',
      threshold: 0
    })
    observerRef.current.observe(sentinelRef.current)
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Retry handler for error state
  const handleRetry = () => {
    const retryPage = posts.length === 0 ? 1 : currentPage + 1
    loadPage(retryPage)
  }

  return (
    <div className="post-infinite-scroller">
      <PostComposer />

      {error && (
        <div className="feed-error">
          <p>Failed to load posts. Please try again.</p>
          <button onClick={handleRetry} className="retry-button">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="empty-state">
          <p>No posts yet. Be the first to post!</p>
        </div>
      )}

      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}

      <div ref={sentinelRef} className="loading-sentinel">
        {loading && <div className="loading-indicator">Loading...</div>}
      </div>
    </div>
  )
}

export default PostCardInfiniteScroller