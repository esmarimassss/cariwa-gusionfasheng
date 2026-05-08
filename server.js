const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

let numbers = [];

function loadNumbers() {
    if (fs.existsSync('numbers.json')) {
        numbers = JSON.parse(fs.readFileSync('numbers.json'));
    } else {
        numbers = [];
    }
}

loadNumbers();

res.send('Upload berhasil');app.post('/upload', upload.single('file'), (req, res) => {

    const filePath = req.file.path;

    const data = fs.readFileSync(filePath, 'utf-8');

    const newNumbers = data
        .split(/\r?\n/)
        .map(n => n.trim())
        .filter(n => n);

    numbers = [...numbers, ...newNumbers];

    fs.writeFileSync(
        'numbers.json',
        JSON.stringify(numbers, null, 2)
    );

    fs.unlinkSync(filePath);

    res.send('Upload berhasil');

});

app.get('/get-number/:count', (req, res) => {

    const count = parseInt(req.params.count);

    loadNumbers();

const result = numbers.slice(0, count);

    numbers.splice(0, count);

    fs.writeFileSync(
        'numbers.json',
        JSON.stringify(numbers, null, 2)
    );

    res.json({
        numbers: result
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server jalan di port ' + PORT);
});