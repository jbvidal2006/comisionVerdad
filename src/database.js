const mongoose = require('mongoose');

const URI = 'mongodb+srv://jbvidal:admin@cluster0-fdvtu.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true })
.then(db=console.log('DB is connected'))
.catch(err => console.error(err));

module.exports = mongoose;
