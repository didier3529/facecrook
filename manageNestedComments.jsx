import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

const addReply = (commentList, parentId, reply) => {
  return commentList.map(comment => {
    if (comment.id === parentId) {
      return {
        ...comment,
        children: comment.children ? [...comment.children, reply] : [reply]
      }
    }
    if (comment.children) {
      return {
        ...comment,
        children: addReply(comment.children, parentId, reply)
      }
    }
    return comment
  })
}

const deleteCommentById = (commentList, idToDelete) => {
  return commentList.reduce((acc, comment) => {
    if (comment.id === idToDelete) return acc
    const updated = { ...comment }
    if (updated.children) {
      updated.children = deleteCommentById(updated.children, idToDelete)
    }
    acc.push(updated)
    return acc
  }, [])
}

const editCommentById = (commentList, idToEdit, newContent) => {
  return commentList.map(comment => {
    if (comment.id === idToEdit) {
      return {
        ...comment,
        content: newContent,
        edited: true
      }
    }
    if (comment.children) {
      return {
        ...comment,
        children: editCommentById(comment.children, idToEdit, newContent)
      }
    }
    return comment
  })
}

const styles = {
  container: {},
  newCommentArea: { marginBottom: 20 },
  textarea: { width: '100%' },
  comment: { marginLeft: 20, borderLeft: '1px solid #ddd', paddingLeft: 10, marginTop: 10 },
  replyContainer: { marginTop: 5 }
}

const Comment = React.memo(({ comment, onAdd, onDelete, onEdit }) => {
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(comment.content)

  const handleSaveEdit = () => {
    onEdit(comment.id, editText.trim())
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditText(comment.content)
  }

  const handleAddReply = () => {
    onAdd(comment.id, replyText)
    setReplyText('')
    setIsReplying(false)
  }

  return (
    <div style={styles.comment}>
      <div>
        <strong>{comment.author}</strong>{' '}
        <small>{new Date(comment.timestamp).toLocaleString()}</small>
      </div>
      {isEditing ? (
        <div>
          <textarea
            style={styles.textarea}
            rows={3}
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      ) : (
        <p>{comment.content}{comment.edited && ' (edited)'}</p>
      )}
      <div>
        <button onClick={() => setIsReplying(prev => !prev)}>
          {isReplying ? 'Cancel' : 'Reply'}
        </button>
        <button onClick={() => setIsEditing(true)}>Edit</button>
        <button onClick={() => onDelete(comment.id)}>Delete</button>
      </div>
      {isReplying && (
        <div style={styles.replyContainer}>
          <textarea
            style={styles.textarea}
            rows={2}
            value={replyText}
            onChange={e => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={handleAddReply}>Add Reply</button>
        </div>
      )}
      {comment.children && comment.children.map(child => (
        <Comment
          key={child.id}
          comment={child}
          onAdd={onAdd}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
})

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    edited: PropTypes.bool,
    children: PropTypes.array
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
}

const ManageNestedComments = ({ initialComments }) => {
  const [comments, setComments] = useState(initialComments)
  const [newCommentText, setNewCommentText] = useState('')

  const handleAddComment = useCallback((parentId, content) => {
    if (!content.trim()) return
    const newComment = {
      id: uuidv4(),
      author: 'CurrentUser',
      content: content.trim(),
      timestamp: new Date().toISOString(),
      edited: false,
      children: []
    }
    setComments(prevComments => {
      if (parentId == null) {
        return [...prevComments, newComment]
      }
      return addReply(prevComments, parentId, newComment)
    })
  }, [])

  const handleDeleteComment = useCallback(id => {
    setComments(prevComments => deleteCommentById(prevComments, id))
  }, [])

  const handleEditComment = useCallback((id, newContent) => {
    if (!newContent.trim()) return
    setComments(prevComments => editCommentById(prevComments, id, newContent.trim()))
  }, [])

  const handleAddRootComment = () => {
    handleAddComment(null, newCommentText)
    setNewCommentText('')
  }

  return (
    <div style={styles.container}>
      <h3>Comments</h3>
      <div style={styles.newCommentArea}>
        <textarea
          style={styles.textarea}
          rows={3}
          value={newCommentText}
          onChange={e => setNewCommentText(e.target.value)}
          placeholder="Write a comment..."
        />
        <button onClick={handleAddRootComment}>Add Comment</button>
      </div>
      <div>
        {comments.length > 0 ? (
          comments.map(comment => (
            <Comment
              key={comment.id}
              comment={comment}
              onAdd={handleAddComment}
              onDelete={handleDeleteComment}
              onEdit={handleEditComment}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  )
}

ManageNestedComments.propTypes = {
  initialComments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    edited: PropTypes.bool,
    children: PropTypes.array
  }))
}

ManageNestedComments.defaultProps = {
  initialComments: []
}

export default ManageNestedComments