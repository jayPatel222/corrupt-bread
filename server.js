const express = require('express');
const app = express();
const PORT = process.env.port || 5000;
app.get('/', (req, res) => res.send('API running'))
app.listen(PORT,
    function () {
        console.log('Server running on 5000')
    });
