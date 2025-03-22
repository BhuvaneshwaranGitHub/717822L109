const express=require('express');
const {getAverage}=require('../controllers/averageController');
const router=express.Router();
router.get('/:numberType',getAverage);
module.exports=router;