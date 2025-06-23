function AddMissingAiFile({ personaId, onFileAdded }) {
  const [status, setStatus] = useState('checking'); // checking, missing, exists, adding, added, error
  const [error, setError] = useState(null);

  useEffect(() => {
    let controller = new AbortController();

    if (!personaId) {
      setStatus('missing');
      setError(null);
      return () => {
        controller.abort();
      };
    }

    setStatus('checking');
    setError(null);

    async function checkFile() {
      try {
        const res = await fetch(`/api/ai-files/${personaId}`, { signal: controller.signal });
        if (res.ok) {
          setStatus('exists');
        } else if (res.status === 404) {
          setStatus('missing');
        } else {
          throw new Error(`Unexpected status ${res.status}`);
        }
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err);
        setStatus('error');
      }
    }

    checkFile();

    return () => {
      controller.abort();
    };
  }, [personaId]);

  async function handleAdd() {
    if (!personaId) return;
    setStatus('adding');
    setError(null);
    try {
      const res = await fetch('/api/ai-files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personaId }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Error ${res.status}`);
      }
      setStatus('added');
      if (typeof onFileAdded === 'function') {
        onFileAdded(personaId);
      }
    } catch (err) {
      setError(err);
      setStatus('error');
    }
  }

  if (status === 'checking') {
    return <div>Checking AI file...</div>;
  }

  if (status === 'exists') {
    return null;
  }

  if (status === 'added') {
    return <div>AI file added successfully.</div>;
  }

  return (
    <div>
      {status === 'error' && (
        <div style={{ color: 'red' }}>
          Error: {error?.message || 'An unexpected error occurred'}
        </div>
      )}
      <button onClick={handleAdd} disabled={status === 'adding' || !personaId}>
        {status === 'adding' ? 'Adding AI file...' : 'Add AI File'}
      </button>
    </div>
  );
}

export default AddMissingAiFile;