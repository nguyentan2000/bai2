const customerModel=require('../models/customer.model')
const express=require('express')
const router=express.Router()

router.get('/',async(req,res)=>{
    try{
        const customers= await customerModel.find()
        res.render('customers/list',{customers:customers})
    }catch(e){
        console.log(e.message)
        res.redirect('/')
    }
   
})
router.get('/add',(req,res)=>{
    res.render('customers/add')
})
router.post('/add',async(req,res)=>{

    try{
        const newCus=new customerModel({
            name:req.body.name,
            old:req.body.old
        })
        await newCus.save()
        res.redirect('/customer')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
    
})
router.delete('/delete/:id',async(req,res)=>{
    try{
        console.log(req.params.id)
        await customerModel.findByIdAndDelete(req.params.id)
        res.redirect('/customer')
    }catch(err){
        console.log(e)
        res.redirect('/')
    }
})
router.get('/edit/:id',async(req,res)=>{
    try{
        const customer=await customerModel.findById(req.params.id)
        res.render('customers/edit',{customer})
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})
router.put('/edit/:id',async(req,res)=>{
    try{
        let cus=await customerModel.findById(req.params.id)
        cus.name=req.body.name
        cus.old=req.body.old
        await cus.save()
        res.redirect('/customer')
    }catch(e){
        console.log(e)
        res.redirect('/')
    }
})

module.exports=router