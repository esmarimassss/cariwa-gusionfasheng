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