const express = require('express');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/cariwa-gusionfasheng', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/admin.html'));
});

const upload = multer({ dest: 'uploads/' });

const DB_FILE = 'numbers.json';

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

function getNumbers() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveNumbers(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get('/api/random/:count', (req, res) => {
  let count = parseInt(req.params.count);
  let data = getNumbers();

  if (data.length === 0) {
    return res.json([]);
  }

  let result = data.splice(0, count);
  saveNumbers(data);

  res.json(result);
});

app.get('/api/count', (req, res) => {
  let data = getNumbers();
  res.json({ total: data.length });
});

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;

  const content = fs.readFileSync(filePath, 'utf-8');

  const lines = content
    .split('\n')
    .map(v => v.trim())
    .filter(v => v.length > 5);

  let oldData = getNumbers();

  oldData.push(...lines);

  saveNumbers(oldData);

  fs.unlinkSync(filePath);

  res.send('Upload berhasil');
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});