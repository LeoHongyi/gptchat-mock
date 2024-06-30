import React from 'react';
import ChatWindow from './components/ChatWindow';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>GPT Chat</h1>
            </header>
            <ChatWindow />
        </div>
    );
};

export default App;
