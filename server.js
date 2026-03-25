const express = require('express');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const rideRouter = require('./routes/rides');
const authRouter = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use('/api/auth', authRouter);
app.use('/api', rideRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

