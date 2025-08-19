import { useState, useRef } from 'react';
import { uploadDocument } from '../services/api';
import ErrorMessage from './ErrorMessage';


function FileUpload({ onUploadSuccess, onProcessingChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (file) => {
    setError('');
    onProcessingChange(true);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      setError('Please select a file');
      return;
    }

  
    const validTypes = ['.pdf', '.docx', '.txt'];
    const fileExtension = file.name.toLowerCase().slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
    if (!validTypes.includes('.' + fileExtension)) {
      setError('Please upload a PDF, DOCX, or TXT file');
      return;
    }

    
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('document', file);

      const data = await uploadDocument(formData);
      onUploadSuccess({ ...data, filename: file.name });
    } catch (err) {
      setError(err.message || 'Failed to upload file');
    } finally {
      setIsLoading(false);
      onProcessingChange(false);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="file-upload-section">
      <div 
        className={`drag-drop-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="drag-drop-content">
          <div className="upload-icon">📁</div>
          <h3>Drop your document here or click to browse</h3>
          <p>Supports PDF, DOCX, and TXT files (max 5MB)</p>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleInputChange}
          accept=".pdf,.docx,.txt"
          style={{ display: 'none' }}
        />
      </div>

      <button 
        className="browse-button"
        onClick={() => fileInputRef.current?.click()}
        disabled={isLoading}
      >
        {isLoading ? 'Uploading...' : 'Browse Files'}
      </button>

      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default FileUpload;