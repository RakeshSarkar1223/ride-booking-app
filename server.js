const express = require('express');
require('dotenv').config();
const Router = require('./routes/rides')
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use('/api', Router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

