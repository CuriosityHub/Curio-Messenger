import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { StyleContextProvider } from './context/StyleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <StyleContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </StyleContextProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
