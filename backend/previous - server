// backend/src/config/db.js

import mongoose from 'mongoose';
import express from 'express'
import cors from 'cors'
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/complient-system');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
//models
const complientSchema=new mongoose.Schema({
    // compl_id:{type:String,required:true},
    // filledBY:{type:String,required:true},
    // id:{type:String,required:true},
    title:{type:String},
    description:{type:String},
    status:{type:String,default:'Pending'},
    // assignedPerson:{type:String}
})
 const complient = mongoose.model('complient',complientSchema)
 //create complient
// const createComplient = new complient.insertOne(
// {
//     compl_id:'1',
//     filledBY:'alemu',
// }
// )
const app = express()
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
  }
};

startServer();
//create note
app.use(express.json())
app.use(cors())
app.post('/api/complaints',async (req,res)=>{
    try{
        const newComplient = new complient(req.body)
        const savedComplient = await newComplient.save()
        res.status(201).json(savedComplient)
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
})
app.get('/api/complaints',async(req,res)=>{
  try{const compliants = await complient.find()
      res.status(200).json(compliants)
    }
    catch(e){
      res.status(404).json({error:e.message})
    }
})
app.put('/api/complaints/:id',async(req,res)=>{
  try { const id = req.params.id
      const status = req.body.status
      if(!status){
        return res.status(400).send('status required')
      }
      const updatedCompliant = await complient.findByIdAndUpdate(
      id,
      {status:status},
      { new: true }
      )
      if(!updatedCompliant)
        return res.status(400).send('complient not found')
      //if successfully updated
      res.status(200).json(updatedCompliant)}
  catch(e){
    return res.status(500).json({error:'Internal server error'})
  }
})
app.delete('/api/complaints/:id',async(req,res)=>{
  try{
      const id = req.params.id
    if(!id){
    return res.status(400).send('complaint not found')
    }
    const deletedCompliant = await complient.findByIdAndDelete(id)
    res.status(200).json(deletedCompliant)
}
catch(e){
  return res.status(500).json({error:'internal server error'})
}
  }
)