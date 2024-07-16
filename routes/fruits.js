//FRUIT CRUD ROUTES
const express = require('express')
const router = express.Router()
const Fruit = require('../models/fruit')
//INdex - GET
router.get('/',async (req,res) => {
    const allFruits = await Fruit.find({}) 
    res.json(allFruits)
})
//show - get - indiv fruit // POSTMAN will provide an id items
router.get('/:id', async (req,res) => {
   try {
    const oneFruit = await Fruit.findById(req.params.id)
    res.json(oneFruit)  
  } catch (error) {
  res.status(500).json({msg: "whoops, something went wrong"})
    console.error(error, message)
  }}) 



//new - get - form

//create - post 
router.post('/', async (req,res) => {
  const newFruit = await Fruit.create(req.body)
  res.json(newFruit)
})

//edit - get - form

//Update - Put/Patch 
router.put('/:id', async (req,res) => {
  const updateFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body)
  res.json(updateFruit)
})
//destroy - Delete
router.delete('/:id', async(req,res) => {
  const deleteFruit = await Fruit.findByIdAndDelete(req.params.id)
  res.json(deleteFruit)
})
module.exports = router