const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const {mongoose}  = require('./database');


//section settings
app.set('port', process.env.PORT || 3000);

//section  Middlewares 
app.use(morgan('dev'));
app.use(express.json());

//section routes
app.use('/api/resource', require('./routes/resource.routes'));



//Section static files
app.use(express.static(path.join(__dirname,'public')))

//Starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}  `); 
});
