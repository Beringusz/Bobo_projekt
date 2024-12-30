const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const readCSV = async () => {
    const users = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream('admin.csv')
            .pipe(csv())
            .on('data', (row) => {
                users.push(row);
            })
            .on('end', () => resolve(users))
            .on('error', (err) => reject(err));
    });
};

app.post('/check-credentials', async (req, res) => {
    const { email, password } = req.body;

    try {
        const users = await readCSV();
        const user = users.find((u) => u.email === email && u.pw === password);

        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});