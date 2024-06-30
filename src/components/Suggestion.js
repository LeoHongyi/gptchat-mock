import React from 'react';
import './Suggestion.css';

const Suggestion = ({ suggestions, onSelect }) => {
    return (
        <div className={`suggestion-container ${suggestions.length > 0 ? 'has-suggestions' : ''}`}>
            {suggestions.map((suggestion, index) => (
                <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => onSelect(suggestion)}
                >
                    {suggestion}
                </div>
            ))}
        </div>
    );
};

export default Suggestion;