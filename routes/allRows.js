const express = require('express');
const pool    = require('./../db'); 
const cors    = require('cors')
const router  = express.Router();
router.use(cors());
router.get('/test-db',async(req, res)=>{
  const id = 1;
  await pool.query(`SELECT * FROM seeker where seeker_id = ${id} ORDER BY seeker_id DESC`, (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows);
});
});
router.get('/education_rows/:id',async(req, res)=>{
  try {
    const id = (req.params.id)?req.params.id:null;
    const result =  await pool.query(`select *from seeker_education where seeker_id = ${id}`);
    res.status(200).json(result.rows);
    // res.send({data:result.rows});
 } catch(err){
   console.log(err.message);
 }
});
router.get('/experience_rows/:id',async(req, res)=>{
  try {
      const id = (req.params.id)?req.params.id:null;
    const result =  await pool.query("select *from seeker_experience where seeker_id = "+id);
    res.status(200).json(result.rows);
    // res.send({data:result.rows});
 } catch(err){
   console.log(err.message);
 }
});
router.get('/profile_info/:id',async(req, res)=>{
  try {
      const id = (req.params.id)?req.params.id:null;
    const result =  await pool.query("select *from seeker where seeker_id = "+id);
    res.status(200).json(result.rows);
    // res.send({data:result.rows});
 } catch(err){
   console.log(err.message);
 }
});
router.get('/language_rows/:id',async(req, res)=>{
  try {
      const id = (req.params.id)?req.params.id:null;
    const result =  await pool.query("select *from seeker_language where seeker_id = "+id);
    res.status(200).json(result.rows);
    // res.send({data:result.rows});
 } catch(err){
   console.log(err.message);
 }
});
router.get('/reference_rows/:id',async(req, res)=>{
  try {
      const id = (req.params.id)?req.params.id:null;
    const result =  await pool.query("select *from seeker_reference where seeker_id = "+id);
    res.status(200).json(result.rows);
    // res.send({data:result.rows});
 } catch(err){
   console.log(err.message);
 }
});
router.get('/training_rows/:id',async(req, res)=>{
  try {
      const id = (req.params.id)?req.params.id:null;
    const result =  await pool.query("select seeker_train_name,seeker_train_date_from::date,seeker_train_date_to::date from seeker_training where seeker_id = "+id);
    res.status(200).json(result.rows);
    // res.send({data:result.rows});
 } catch(err){
   console.log(err.message);
 }
});
router.get('/certificate_rows/:id',async(req, res)=>{
  try {
      const id = (req.params.id)?req.params.id:null;
    const result =  await pool.query("select *from seeker_certificate where seeker_id = "+id);
    res.status(200).json(result.rows);
    // res.send({data:result.rows});
 } catch(err){
   console.log(err.message);
 }
});
router.get('/get_all_vacancy_info/:id',async(req, res)=>{
  try {
      const id = (req.params.id)?req.params.id:null;
    const result =  await pool.query("select vacancy_duty_station,vacancy_description,vacancy_position,vacancy_employee_type,vacancy_type,vacancy_experience,DATE_PART('day',(vacancy_deadline::date)::timestamp-now()::date::timestamp) as days,apv.applied_vacn_id from vacancy left join applied_vacancy as apv on apv.vacancy_id=vacancy.vacancy_id where vacancy.vacancy_id = "+id+" limit 1;");
    res.status(200).json(result.rows);
    // res.send({data:result.rows});
 } catch(err){
   console.log(err.message);
 }
});
router.get('/my_applied/:id',async(req, res)=>{
  try {
      const id = (req.params.id)?req.params.id:null;
    const result =  await pool.query("select *from vacancy as v join applied_vacancy as apv on apv.vacancy_id = v.vacancy_id where seeker_id = "+id+"");
    res.status(200).json(result.rows);
    // res.send({data:result.rows});
 } catch(err){
   console.log(err.message);
 }
});
router.get('/latest_vacancy',async(req, res)=>{
  try {
    const result =  await pool.query("select vacancy_duty_station,vacancy_description,vacancy_position,vacancy_employee_type,vacancy_type,vacancy_experience,DATE_PART('day',(vacancy_deadline::date)::timestamp-now()::date::timestamp) as days,vacancy_id from vacancy  order by vacancy_id desc;");
    res.status(200).json(result.rows);
    // res.send({data:result.rows});
 } catch(err){
   console.log(err.message);
 }
});

module.exports = router;