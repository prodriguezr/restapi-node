const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { mongoose } = require('./database');
const cors = require('cors');

const app = express();

dotenv.config();

// Settings
app.set('app_port', process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4210'}));

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));
// Main
async function main() {
    await app.listen(app.get('app_port'));
    console.log(`Server runnimg on port: ${app.get('app_port')}`);
}

main();