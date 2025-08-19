import { useState } from 'react';
import { queryDocument } from '../services/api';
import ErrorMessage from './ErrorMessage';


function QuestionForm({ documentId, setAnswer }) {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError('Please enter a question');
      return;
    }

    if (question.trim().length < 3) {
      setError('Question must be at least 3 characters long');
      return;
    }

    setIsLoading(true);
    setError('');
    setAnswer(''); 

    try {
      const data = await queryDocument(documentId, question);
      setAnswer(data.answer);
    } catch (err) {
      setError(err.message || 'Failed to get answer');
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    "What is the main topic of this document?",
    "Can you summarize this document?",
    "What are the key points mentioned?",
    "Who is the author or target audience?"
  ];

  return (
    <div className="question-form-section">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="question-input">Ask a question about the document:</label>
          <textarea
            id="question-input"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question here..."
            disabled={isLoading}
            rows={3}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={isLoading || !question.trim()}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Thinking...
            </>
          ) : (
            'Ask Question'
          )}
        </button>
      </form>

      {error && <ErrorMessage message={error} />}

      <div className="sample-questions">
        <h4>Try asking:</h4>
        <div className="question-chips">
          {sampleQuestions.map((sample, index) => (
            <button
              key={index}
              type="button"
              className="question-chip"
              onClick={() => setQuestion(sample)}
              disabled={isLoading}
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuestionForm;