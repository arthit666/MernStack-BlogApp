const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

//update
router.put('/:id', async (req,res)=>{
    if(req.body.userId === req.params.id){
      if(req.body.password){
          const salt = await bcrypt.genSalt(10);
          req.body.password =await bcrypt.hash(req.body.password,salt);
      }
      try {
          const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
          },{new: true})
          res.status(200).json(updatedUser)
      } catch (error) {
        res.status(500).json(error)
      }
    }else{
      res.status(400).json('You can update only you account!')
    }
   
})

//delete
router.delete('/:id', async (req,res)=>{
  if(req.body.userId === req.params.id){

    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({username: user.username});  //delete all post of id
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted..');
    } catch (error) {
      res.status(500).json(error);
       }
    } catch (error) {
      res.status(400).json('User not found');
    }


  }else{
    res.status(400).json('You can delete only you account!')
  }
 
})

//get user
router.get('/:id',async (req,res)=>{
  try {
    const user = await User.findById(req.params.id);
    const {password , ...other} = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router