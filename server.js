const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();

app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

let numbers = [];

app.post('/upload', upload.single('file'), (req, res) => {

    const data = fs.readFileSync(req.file.path, 'utf8');

    numbers = data
        .split(/\r?\n/)
        .map(v => v.trim())
        .filter(v => v);

    fs.unlinkSync(req.file.path);

    res.json({
        success: true,
        total: numbers.length
    });

});

app.get('/stock', (req, res) => {
    res.json({
        stock: numbers.length
    });
});

app.get('/get-number/:count', (req, res) => {

    const count = parseInt(req.params.count);

    const result = numbers.splice(0, count);

    res.json({
        numbers: result
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('jalan');
});