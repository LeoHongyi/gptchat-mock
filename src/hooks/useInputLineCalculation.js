import { useState, useEffect, useRef } from 'react';

function useInputLineCalculation({ initialValue = '', maxHeightLines = 8, lineHeight = 1.5, initialLines = 12 } = {}) {
    const baseLineHeight = 16; // Assuming 16px as the base line-height in pixels.
    const [value, setValue] = useState(initialValue);
    
    const inputRef = useRef(null);
    const initHeight = `${initialLines * lineHeight * baseLineHeight}px`

    useEffect(() => {
        // Set the initial height
        if (inputRef.current) {
            inputRef.current.style.height = initHeight;
        }
    }, []);

    useEffect(() => {
        calculateHeight(value);
    }, [value]);

    const calculateHeight = (text) => {
        if (inputRef.current) {
            // Reset textarea height to auto to get the correct scrollHeight
            inputRef.current.style.height = 'auto';
            //set min height to make sure it is not too small, since height auto will shrink the input
            inputRef.current.style.minHeight = initHeight;
            const newHeight = inputRef.current.scrollHeight;
            const maxAllowedHeight = maxHeightLines * lineHeight * baseLineHeight; // Max height in pixels

            inputRef.current.style.height = `${Math.min(newHeight, maxAllowedHeight)}px`;
            inputRef.current.style.overflowY = newHeight > maxAllowedHeight ? 'auto' : 'hidden';
        }
    };

    const handleChange = (text) => {
        setValue(text);
        calculateHeight(text);
    };

    return {
        value,
        handleChange,
        inputRef,
    };
}

export default useInputLineCalculation;