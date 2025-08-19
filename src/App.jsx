import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import './App.css';
import ServerStatus from './components/ServerStatus';

function App() {
  const [serverStatus, setServerStatus] = useState('checking');
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const verifyServerConnection = async () => {
      try {
       
        setServerStatus('connected');
      } catch (error) {
        setServerStatus('disconnected');
        setServerError(error.message);
      }
    };

    verifyServerConnection();
  }, []);

  return (
    <div className="app">
      <ServerStatus status={serverStatus} error={serverError} />
      {serverStatus === 'connected' && <HomePage />}
    </div>
  );
}

export default App;