const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/restapi_node';

mongoose.Promise = global.Promise; //Promise type avoids warnings mongoose throws
mongoose.connect(URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true})
    .then(() => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;