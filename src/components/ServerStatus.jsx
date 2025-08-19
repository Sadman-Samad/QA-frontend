function ServerStatus({ status, error }) {
  if (status === 'checking') {
    return (
      <div className="server-status checking">
        <div className="status-spinner"></div>
        Connecting to server...
      </div>
    );
  }

  if (status === 'disconnected') {
    return (
      <div className="server-status disconnected">
        <div className="status-icon">⚠️</div>
        <div className="status-content">
          <h3>Server Connection Failed</h3>
          <p>{error}</p>
          <p className="help-text">
            Make sure the backend server is running on port 5000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="server-status connected">
      <div className="status-icon">✅</div>
      Connected to server
    </div>
  );
}

export default ServerStatus;