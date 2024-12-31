const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());

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

//adagarea anuntelor
const FILE_PATH = path.join(__dirname, 'announcements.json');

// Endpoint to save an announcement
app.post('/save-announcement', (req, res) => {
  const newAnnouncement = req.body;

  // Read existing announcements
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err && err.code !== 'ENOENT') {
      console.error(err);
      return res.status(500).send('Error reading file.');
    }

    const announcements = data ? JSON.parse(data) : [];

    // Append the new announcement
    announcements.push(newAnnouncement);

    // Write back to the file
    fs.writeFile(FILE_PATH, JSON.stringify(announcements, null, 2), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error saving announcement.');
      }

      res.status(200).send('Announcement saved successfully!');
    });
  });
});

app.get('/get-announcements', (req, res) => {
  fs.readFile(FILE_PATH, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading announcements:', err);
      return res.status(500).send('Error reading announcements.');
    }

    const announcements = JSON.parse(data);
    res.json(announcements);
  });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});