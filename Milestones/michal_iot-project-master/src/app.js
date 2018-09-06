const express = require('express');

const PORT = 8080;
const app = express();

app.get('/', (req, res) => {
    res.send('It Works!');
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
