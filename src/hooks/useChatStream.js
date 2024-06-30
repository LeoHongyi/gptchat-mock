import { useState, useCallback } from 'react';

const useChatStream = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = useCallback((text) => {
        setLoading(true);
        const messageId = Date.now();
        const userMessage = { id: messageId, text, sender: 'user' };

        // Add user message to state
        setMessages((prevMessages) => [
            ...prevMessages,
            userMessage,
        ]);

        const fetchStream = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: text }),
                });

                if (!response.body) {
                    setLoading(false);
                    return;
                }

                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let accumulatedResponse = '';

                let done = false;
                let botMessageId = Date.now();
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { id: botMessageId, text: '', sender: 'gpt' }
                ]);

                while (!done) {
                    const { value, done: readerDone } = await reader.read();
                    done = readerDone;
                    accumulatedResponse += decoder.decode(value, { stream: true });

                    // Update the bot response in the state gradually
                    setMessages((prevMessages) => 
                        prevMessages.map(msg => 
                            msg.id === botMessageId 
                            ? { ...msg, text: accumulatedResponse } 
                            : msg
                        )
                    );
                }

            } catch (error) {
                console.error('Error fetching stream:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStream();
    }, []);

    return { messages, sendMessage, loading };
};

export default useChatStream;