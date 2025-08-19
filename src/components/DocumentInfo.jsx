function DocumentInfo({ filename, onNewUpload }) {
  return (
    <div className="document-info">
      <div className="document-details">
        <span className="document-icon">📄</span>
        <span className="document-name">{filename}</span>
      </div>
      <button 
        className="new-upload-button"
        onClick={onNewUpload}
        title="Upload a different document"
      >
        📁 Upload New
      </button>
    </div>
  );
}

export default DocumentInfo;