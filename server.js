const express = require('express');
const connectDB = require('./config/db')
const app = express();

connectDB();
const PORT = process.env.port || 5000;
app.use(express.json({extended: false}));

app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));

app.get('/', (req, res) => res.send('API running'))
app.listen(PORT,
    function () {
        console.log('Server running on 5000')
    });
