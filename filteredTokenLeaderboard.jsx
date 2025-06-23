import React, { useState, useEffect, useMemo } from 'react';
import useDebounce from '../hooks/useDebounce';
import PropTypes from 'prop-types';

function FilteredTokenLeaderboard({ tokenType, maxEntries }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(`/api/leaderboard?token=${encodeURIComponent(tokenType)}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch leaderboard: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        setEntries(data.entries || []);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [tokenType]);

  const filteredEntries = useMemo(() => {
    return entries
      .filter((e) =>
        e.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      .sort((a, b) => b.balance - a.balance)
      .slice(0, maxEntries);
  }, [entries, debouncedSearchTerm, maxEntries]);

  return (
    <div className="filtered-token-leaderboard">
      <h2 className="ftl-header">{tokenType} Leaderboard</h2>
      <div className="ftl-controls">
        <input
          type="text"
          placeholder="Search username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="ftl-search"
        />
      </div>
      {loading && <div className="ftl-loading">Loading...</div>}
      {error && <div className="ftl-error">Error: {error}</div>}
      {!loading && !error && (
        <ul className="ftl-list">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry, index) => (
              <li key={entry.id || entry.username} className="ftl-entry">
                <span className="ftl-rank">#{index + 1}</span>
                <img
                  src={entry.avatarUrl || '/default-avatar.png'}
                  alt={`${entry.username} avatar`}
                  className="ftl-avatar"
                />
                <span className="ftl-username">{entry.username}</span>
                <span className="ftl-balance">
                  {entry.balance.toLocaleString()} {tokenType}
                </span>
              </li>
            ))
          ) : (
            <li className="ftl-no-results">No matching entries found.</li>
          )}
        </ul>
      )}
    </div>
  );
}

FilteredTokenLeaderboard.propTypes = {
  tokenType: PropTypes.string.isRequired,
  maxEntries: PropTypes.number,
};

FilteredTokenLeaderboard.defaultProps = {
  maxEntries: 10,
};

export default React.memo(FilteredTokenLeaderboard);