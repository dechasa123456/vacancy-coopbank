const express = require('express');
const pool    = require('../db'); 
const cors    = require('cors')
// const format    = require('date-format')
var fileName = null;
const multer  = require('multer');//mutipart/data-format
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'publics/file')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname)
    // fileName=Date.now() + '-' +file.originalname;
  }
})

// const fileCert = multer({ dest: './publics/file/' });
var upload = multer({storage}).single('file');
const router  = express.Router();
const bodyPar = require('body-parser');
router.use( bodyPar.json() ); 
router.use(bodyPar.urlencoded({ extended: true })); 
router.use(cors()) 

router.get('/save_vacancy',(req, res)=>{
 try {
    res.send('tests');
    // res.status(200).json(result_seeker.rows);   
    } catch(err){
     console.log(err.message);
 }
});

module.exports = router;