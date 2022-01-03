const express = require('express');
const pool    = require('./../db'); 
const cors    = require('cors');
var crypto    = require('crypto');
var fileName = null;
const multer  = require('multer');//mutipart/data-format
// const fileCert = multer({ dest: './publics/file/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'publics/file')
  },
  filename: function (req, file, cb) {
    fileName = Date.now() + '-' +file.originalname;
    cb(null, fileName)
    // fileName=Date.now() + '-' +file.originalname;
   
}
})
var upload = multer({storage});
const router  = express.Router();
router.use(cors()); 
const bodyPar = require('body-parser');
router.use( bodyPar.json() ); 
router.use(bodyPar.urlencoded({ extended: true })); 
// var cpUpload = fileCert.fields([{ name: 'file', maxCount: 8 }]);
router.post('/add_certificate',upload.single('file'),async(req, res)=>{
    // console.log(fileName);
 try {
     const seeker_id = req.body.seeker_id;
     var insert = "insert into seeker_certificate (seeker_cert_name,seeker_cert_file,seeker_cert_description,seeker_id ) values('"+req.body.name+"','"+'file/'+fileName+"','"+req.body.description+"','"+seeker_id+"') RETURNING seeker_cert_id";
     const result_insert =  await pool.query(insert);
    res.status(200).json(result_insert.rows);   
    } catch(err){
     console.log(err.message);
 }
});
router.post('/signup',async(req, res)=>{
 try {
     const cryptoSha1 = crypto.createHash('sha1');
     const password =  cryptoSha1.update(req.body.password).digest('hex');
     var seeker = "insert into seeker (seeker_name,seeker_mobile_phone) values('"+req.body.name+"','"+req.body.phone+"') RETURNING seeker_id";
     const result_seeker =  await pool.query(seeker);
     const seeker_id = result_seeker.rows[0].seeker_id;
     var account = "insert into account (account_username,account_password,seeker_id) values('"+req.body.phone+"','"+password+"','"+seeker_id+"') RETURNING account_id";
     const result_account =  await pool.query(account);
    res.status(200).json(result_seeker.rows);   
    } catch(err){
     console.log(err.message);
 }
});

router.post('/update_profile',async(req, res)=>{
 try {
     const seeker_id = req.body.seeker_id;
     const name = req.body.name;
     const mobile_phone = req.body.phone;
     const other_phone = req.body.other_phone;
     const birth_date = req.body.birth_date;
     const gender = req.body.gender;
     const martial_status = req.body.martial_status;
     const birth_region = req.body.birth_region;
     const birth_zone = req.body.birth_zone;
     const residence_region = req.body.residence_region;
     const residence_zone = req.body.residence_zone;

     var seeker = "update seeker set seeker_name='"+name+"',seeker_mobile_phone='"+mobile_phone+"',seeker_other_phone='"+other_phone+"',seeker_birth_date='"+birth_date+"',seeker_gender='"+gender+"',seeker_martial_status='"+martial_status+"',seeker_birth_region='"+birth_region+"',seeker_birth_zone='"+birth_zone+"',seeker_residence_region='"+residence_region+"',seeker_residence_zone='"+residence_zone+"' where seeker_id='"+seeker_id+"'";
     const result_seeker =  await pool.query(seeker);
    res.status(200).json(result_seeker.rowCount);   
    } catch(err){
     console.log(err.message);
 }
});
router.post('/add_education',async(req, res)=>{
 try {
     const seeker_id = req.body.seeker_id;
     var insert = "insert into seeker_education (seeker_education_inst,seeker_education_inst_type,seeker_education_cost_sharing,seeker_education_level_educ,seeker_education_grad_year,seeker_education_gpa,seeker_education_fld_study,seeker_id) values('"+req.body.institute+"','"+req.body.type+"','"+req.body.cost_share+"','"+req.body.level_education+"','"+req.body.grad_year+"','"+req.body.gpa+"','"+req.body.fld_study+"','"+seeker_id+"') RETURNING seeker_education_id";
     const result_insert =  await pool.query(insert);
    res.status(200).json(result_insert.rows);   
    } catch(err){
     console.log(err.message);
 }
});
router.post('/add_experience',async(req, res)=>{
 try {
     const seeker_id = req.body.seeker_id;
     var insert = "insert into seeker_experience (seeker_expr_organization,seeker_expr_position,seeker_expr_date_from,seeker_expr_date_to,seeker_id ) values('"+req.body.organization+"','"+req.body.position+"','"+req.body.date_from+"','"+req.body.date_to+"','"+seeker_id+"') RETURNING seeker_expr_id";
     const result_insert =  await pool.query(insert);
    res.status(200).json(result_insert.rows);   
    } catch(err){
     console.log(err.message);
 }
});
router.post('/add_language',async(req, res)=>{
 try {
     const seeker_id = req.body.seeker_id;
     var insert = "insert into seeker_language (seeker_lang,seeker_lang_read,seeker_lang_write,seeker_lang_speak,seeker_lang_listen,seeker_id ) values('"+req.body.language+"','"+req.body.read+"','"+req.body.write+"','"+req.body.speak+"','"+req.body.listen+"','"+seeker_id+"') RETURNING seeker_lang_id";
     const result_insert =  await pool.query(insert);
    res.status(200).json(result_insert.rows);   
    } catch(err){
     console.log(err.message);
 }
});
router.post('/add_training',async(req, res)=>{
 try {
     const seeker_id = req.body.seeker_id;
     var insert = "insert into seeker_training (seeker_train_name,seeker_train_date_from,seeker_train_date_to,seeker_id ) values('"+req.body.name+"','"+req.body.date_from+"','"+req.body.date_to+"','"+seeker_id+"') RETURNING seeker_train_id";
     const result_insert =  await pool.query(insert);
    res.status(200).json(result_insert.rows);   
    } catch(err){
     console.log(err.message);
 }
});

router.post('/add_reference',async(req, res)=>{
 try {
     const seeker_id = req.body.seeker_id;
     var insert = "insert into seeker_reference (seeker_refr_name,seeker_refr_phone,seeker_refr_address,seeker_refr_relation,seeker_id ) values('"+req.body.name+"','"+req.body.phone+"','"+req.body.address+"','"+req.body.relation+"','"+seeker_id+"') RETURNING seeker_refr_id";
     const result_insert =  await pool.query(insert);
    res.status(200).json(result_insert.rows);   
    } catch(err){
     console.log(err.message);
 }
});
router.post('/save_apply',async(req, res)=>{
 try {
     const seeker_id = req.body.seeker_id;
     const file = "";
     var insert = "insert into applied_vacancy (vacancy_id,seeker_id,vacancy_file_name,vacancy_file ) values('"+req.body.vacancy_id+"','"+seeker_id+"','"+req.body.name+"','"+file+"') RETURNING applied_vacancy_auto";
     const result_insert =  await pool.query(insert);
    res.status(200).json(result_insert.rows);   
    } catch(err){
     console.log(err.message);
 }
});
router.post('/login',async(req, res)=>{
 try {
     const phone = req.body.phone;
     const cryptoSha1 = crypto.createHash('sha1');
     const password   =  cryptoSha1.update(req.body.password).digest('hex');
     var insert = "select *from account where account_username = '"+phone+"' and account_password = '"+password+"'";
     const result_insert =  await pool.query(insert);
    res.status(200).json(result_insert.rows);   
    } catch(err){
     console.log(err.message);
 }
});
router.post('/search_result',async(req, res)=>{
    try {
        const auto_id = (req.body.auto_id)?req.body.auto_id:null;
      const result =  await pool.query("select *from  applied_vacancy where applied_vacancy_auto = "+auto_id+"");
      res.status(200).json(result.rows);
      // res.send({data:result.rows});
   } catch(err){
     console.log(err.message);
   }
  });
module.exports = router;