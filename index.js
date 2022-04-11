const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
// import routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');


//env and config able req json
dotenv.config();
app.use(express.json());
app.use('/images',express.static(path.join(__dirname,'/images')))

//connect data
mongoose.connect(process.env.MONGO_URL).then(
  console.log('Conected DB')
).catch(err =>{
  console.log(err)
})
///multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});
//routes
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories',categoryRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log('Sever run on',PORT)
})