const express = require('express');
const router = express.Router();  
const Resource = require('../models/resource');

router.get('/:id', async(req, res)=>{
    const resource =  await Resource.findById(req.params.id);
    console.log(resource);
    res.json(resource);
})

router.get('/', async (req, res)=>{
    const resource =  await Resource.find();
    console.log(resource);
    res.json(resource);
});

router.post('/', async(req, res)=>{
    const {title, key, description, source, typeResource, coverage} = req.body;
    const resource = new Resource({title, key, description, source, typeResource, coverage})
    await resource.save();
    res.json({status: "resource saved"});
});

router.put('/:id', async(req,res)=>{
    const {title, key, description, source, typeResource, coverage} = req.body;
    const newResource = {title, key, description, source, typeResource, coverage};
    await Resource.findByIdAndUpdate(req.params.id, newResource);
    res.json({status: "resource updated"});
})

router.delete('/:id', async(req, res)=>{
    await Resource.findByIdAndRemove(req.params.id);
    res.json({status: "resource deleted"});
})
module.exports = router;