import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_EMOJIS = {
  like: '?',
  love: '??',
  haha: '?',
  wow: '?',
  sad: '?',
  angry: '?'
};

function ToggleReactionButton({
  reactionType = 'like',
  initialCount = 0,
  initialActive = false,
  onToggle,
  customEmoji
}) {
  const [count, setCount] = useState(Math.max(0, initialCount));
  const [active, setActive] = useState(initialActive);
  const emoji = customEmoji || DEFAULT_EMOJIS[reactionType] || '?';

  const handleClick = () => {
    const newActive = !active;
    const delta = newActive ? 1 : -1;
    const newCount = Math.max(0, count + delta);
    setActive(newActive);
    setCount(newCount);
    if (typeof onToggle === 'function') {
      onToggle({ reactionType, active: newActive, count: newCount });
    }
  };

  return (
    <button
      type="button"
      className={`toggle-reaction-button ${reactionType} ${active ? 'active' : ''}`}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={`${reactionType} button`}
    >
      <span className="reaction-emoji">{emoji}</span>
      <span className="reaction-count">{count}</span>
    </button>
  );
}

ToggleReactionButton.propTypes = {
  reactionType: PropTypes.string,
  initialCount: PropTypes.number,
  initialActive: PropTypes.bool,
  onToggle: PropTypes.func,
  customEmoji: PropTypes.string
};

export default ToggleReactionButton;