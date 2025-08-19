import { useEffect, useRef } from 'react';

function AnswerSection({ answer }) {
  const answerRef = useRef(null);

  useEffect(() => {
    if (answer && answerRef.current) {
      answerRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'nearest' 
      });
    }
  }, [answer]);

  if (!answer) return null;

  return (
    <div ref={answerRef} className="answer-section">
      <div className="answer-header">
        <h3>📝 Answer</h3>
        <div className="answer-actions">
          <button 
            className="copy-button"
            onClick={() => navigator.clipboard.writeText(answer)}
            title="Copy answer"
          >
            📋
          </button>
        </div>
      </div>
      <div className="answer-content">
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default AnswerSection;