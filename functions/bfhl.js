const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer();

app.use(cors());
app.use(bodyParser.json());

const userId = "john_doe_17091999"; // Replace with your actual user ID

// POST endpoint
app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data } = req.body;
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets.filter(char => char === char.toLowerCase()).sort().pop() || '';
    const fileValid = req.file ? true : false;
    const fileMimeType = fileValid ? req.file.mimetype : null;
    const fileSizeKb = fileValid ? (req.file.size / 1024).toFixed(2) : 0;

    res.json({
        is_success: true,
        user_id: userId,
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_lowercase_alphabet: [highestLowercaseAlphabet],
        file_valid: fileValid,
        file_mime_type: fileMimeType,
        file_size_kb: fileSizeKb
    });
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

exports.handler = app; // Export the app for Netlify Functions

