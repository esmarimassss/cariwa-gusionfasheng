const express = require('express');
const multer = require('multer');
const fs = require('fs');

const app = express();

app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

let numbers = [];

function loadNumbers() {
    try {
        if (fs.existsSync('numbers.json')) {
            numbers = JSON.parse(fs.readFileSync('numbers.json'));
        } else {
            numbers = [];
        }
    } catch {
        numbers = [];
    }
}

loadNumbers();

app.post('/upload', upload.single('file'), (req, res) => {

    try {

        const filePath = req.file.path;

        const data = fs.readFileSync(filePath, 'utf8');

        const newNumbers = data
            .split(/\r?\n/)
            .map(n => n.trim())
            .filter(n => n.length > 0);

        loadNumbers();

        numbers.push(...newNumbers);

        fs.writeFileSync(
            'numbers.json',
            JSON.stringify(numbers, null, 2)
        );

        fs.unlinkSync(filePath);

        res.json({
            success: true,
            total: numbers.length
        });

    } catch (err) {

        console.log(err);

        res.status(500).send('Upload gagal');

    }

});

app.get('/get-number/:count', (req, res) => {

    try {

        loadNumbers();

        const count = parseInt(req.params.count);

        const result = numbers.slice(0, count);

        numbers.splice(0, count);

        fs.writeFileSync(
            'numbers.json',
            JSON.stringify(numbers, null, 2)
        );

        res.json({
            numbers: result
        });

    } catch (err) {

        console.log(err);

        res.status(500).send('Error');

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server jalan di port ' + PORT);
});