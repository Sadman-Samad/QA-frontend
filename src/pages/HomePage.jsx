import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import DocumentInfo from '../components/DocumentInfo';
import QuestionForm from '../components/QuestionForm';
import AnswerSection from '../components/AnswerSection';

function HomePage() {
  const [documentId, setDocumentId] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [answer, setAnswer] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUploadSuccess = (data) => {
    setDocumentId(data.documentId);
    setDocumentName(data.filename);
    setAnswer('');
  };

  const handleNewUpload = () => {
    setDocumentId(null);
    setDocumentName('');
    setAnswer('');
  };

  return (
    <div className="home-page">
      <header className="header">
        <h1>📄 Document Q&A</h1>
        <p>Upload a document and ask questions about its content</p>
      </header>
      
      <main className="main-content">
        {!documentId ? (
          <FileUpload
            onUploadSuccess={handleUploadSuccess}
            onProcessingChange={setIsProcessing}
          />
        ) : (
          <>
            <DocumentInfo
              filename={documentName}
              onNewUpload={handleNewUpload}
            />
            <QuestionForm
              documentId={documentId}
              setAnswer={setAnswer}
            />
            <AnswerSection answer={answer} />
          </>
        )}
      </main>

      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-spinner"></div>
          <p>Processing document...</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;