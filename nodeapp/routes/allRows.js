const express = require('express');
const pool    = require('./../db'); 
const cors    = require('cors')
const router  = express.Router();
router.use(cors()) 
router.get('/education_rows/:id',async(req, res)=>{
  try {
      const id = (req.params.id)?req.params.id:null;
    const result =  await pool.query("select *from seeker_education where seeker_id = "+id);
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
    const result =  await pool.query("select *from vacancy as v left join applied_vacancy as apv on apv.vacancy_id=v.vacancy_id where v.vacancy_id = "+id+" limit 1;");
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

module.exports = router;