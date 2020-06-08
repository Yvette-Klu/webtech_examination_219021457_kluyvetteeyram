const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')




const appSchema = new mongoose.Schema({
materialcode: {type:String },
materialname:{type:String},
materialunitprice:{type:Number},
materrialstocklevel:{type:Number}






})

const app = mongoose.model('app',appSchema)

router.post('/add',(req,res)=>{
	const data ={
        materialcode : req.body.materialcode,
        materialname:req.body.materialname,
        materialunitprice:req.body.materialunitprice,
        materialstocklevel:req.body.materialunitprice,
        
  }
//  return  console.log(data)
    console.log(data).
    app.findOne({materialcode:materialcode}).then(result =>{
        if(result){
            return res.json({message: `material code already exists`})

        }
        app.create(materialdata).then(newrecord=>{
            return res.json(newrecord);
        })
        .catch(err =>{
            return res.json({
                message:`sorry ${err.message}`
            })
        })
    })
    
  .catch(err=>{
      return res.json({
          message: `sorry ${err.message}`
      })
  })
	

});

router.put('/update/:materialcode',(req,res)=>{
    res.send('update')
    res.json({
        materialcode : req.body.materialcode,
        materialname:req.body.materialname,
        materialunitprice:req.body.materialunitprice,
        materialstocklevel:req.body.materialunitprice,
        
    })
});
router.delete('/delete/:materialcode',(req,res)=>{
    res.send('delete')
    res.json({
        materialcode : req.body.materialcode,
        materialname:req.body.materialname,
        materialunitprice:req.body.materialunitprice,
        materialstocklevel:req.body.materialunitprice,
        
    })
})














module.exports = router;