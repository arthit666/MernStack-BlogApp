const router = require('express').Router();

const Post = require('../models/Post');


//create
router.post('/', async (req,res)=>{
      const newPost = new Post(req.body)
      try {
          res.status(200).json(await newPost.save());
      } catch (error) {
        res.status(500).json(error)
      }
   
})

//update post
router.put('/:id', async (req,res)=>{

  try {
    const post = await Post.findById(req.params.id);
    if(post.username === req.body.username){
      try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id,{
          $set: req.body
        },{new:true})
        res.status(200).json(updatePost)
      } catch (error) {
        res.status(500).json(error);
      }
    }else{
      res.status(401).json('You can undate only you account!')
    }

    } catch (error) {
      res.status(500).json(error);
    }

})

//delet post
router.delete('/:id', async (req,res)=>{
  try {
    const post = await Post.findById(req.params.id);
    if(post.username === req.body.username){
      try {
        await post.delete();
        res.status(200).json('User has been deleted..')
      } catch (error) {
        res.status(500).json(error);
      }
    }else{
      res.status(401).json('You can delete only you account!')
    }

    } catch (error) {
      res.status(500).json(error);
    }

})

//get port
router.get('/:id',async (req,res)=>{
  
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error)
  }
})

//get all port
router.get('/',async (req,res)=>{
  const username = req.query.user;
  const catName  = req.query.cat;
  try {
    let posts;
    if(username){
      posts = await Post.find({username})
    }else if(catName){
      posts = await Post.find({categories:{
        $in:[catName]
      }})
    }else{
      posts = await Post.find();
    }   
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router