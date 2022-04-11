const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//register
router.post('/register', async (req,res)=>{
    try {
        //hash password after record database
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);
        req.body.password = hashedPass;
        const newUser = new User (req.body);
        res.status(200).json(await newUser.save());
    } catch (error) {
      res.status(500).json(error)
    }
})


//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    //check user
    if(!user)
    {
        return res.status(400).json("wrong credentials")
    }
    //check password
    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated)
    {
        return res.status(400).json("wrong credentials");
    }
    // hide password and res
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router