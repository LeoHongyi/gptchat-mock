const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', (req, res) => {
    const { message } = req.body;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const responses = [
        `Response part 1 for: ${message}`,
        `Response part 2 for: ${message}`,
        `Response part 3 for: ${message}`,
        `Response part 4 for: ${message}`,
    ];

    let index = 0;

    const interval = setInterval(() => {
        if (index < responses.length) {
            res.write(`data: ${responses[index]}\n\n`);
            index += 1;
        } else {
            clearInterval(interval);
            res.end();
        }
    }, 1000); // Send a part every second
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});