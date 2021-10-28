const express = require('express');
const Joi     = require('joi'); 
const pool    = require('./db'); 
const cors    = require('cors')
const multer  = require('multer');
const upload  = multer();
const bodyPar = require('body-parser');
const app     = express();
app.use(require('./routes/allRoutes'));
app.set('view engine', 'ejs');
app.use(cors()) 
app.use(express.static( "publics/" ));
// app.use(cors());
app.use(bodyPar.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/test', (req, res) => {
    res.send(pool);
})

const port = process.env.PORT || 3001;
app.listen(port,()=>{console.log(`${port} is loading test express of node`)});