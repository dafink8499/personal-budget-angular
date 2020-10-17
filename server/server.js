const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

app.get('/budget', (req, res) => {
    res.json(JSON.parse(fs.readFileSync('./myBudget.json', 'utf-8')));
});

app.listen(port, () => {
    console.log('API served at http://localhost:${port}');
});