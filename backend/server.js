import mongoose from 'mongoose';
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import authMiddleware from './src/middleware/auth.js'
import blockCheck from './src/middleware/blockCheck.js'
import Admin from './src/models/Admin.js';  // ✅ Correct - relative path
import Student from './src/models/Student.js'
import complaint from './src/models/Complaint.js'
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
dotenv.config()
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
app.use(express.json());
app.use(cookieParser());
// Allow frontend to send cookies
app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true
}));
//  (register/login/logout + me)
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).send('Missing fields');
        }
        
        // Validate email format
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        
        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }
        
        // Check if user already exists
        const exists = await Student.findOne({ email: email.toLowerCase() });
        if (exists) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        
        // Hash password
        const hashed = await bcrypt.hash(password, 10);
        
        // Create student
        const student = await Student.create({ 
            name, 
            email: email.toLowerCase(), 
            password: hashed ,
        });
        
        // Create JWT token
        const token = jwt.sign(
            { id: student._id, role: 'student' },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        
        // Set cookie (optional - uncomment if needed)
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 24 * 60 * 60 * 1000 // 1 day
        // });
        
        console.log(student._id, name, token); // ✅ Fixed
        
        res.status(201).json({
                token,
                role: 'student',
                id: student._id,
                name: student.name
            
        });
    } catch (e) {
        console.error('Registration error:', e);
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/login',async(req,res)=>{
  const{email,password} = req.body
  try  {  // try student model
      let user = await Student.findOne({email:email.toLowerCase()})
      // console.log(user)
      if(user && await bcrypt.compare(password,user.password)){
        const token = jwt.sign({id:user._id,role:"student"},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
        return res.json({token,role:"student",id:user._id,name:user.name})
      }
      //try admin model
    user = await Admin.findOne({email:email.toLowerCase()})
    // console.log(user)
    if(user && await bcrypt.compare(password,user.password)){

      const token = jwt.sign({id:user._id,role:"admin"},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
     return res.json({token,role:"admin",id:user._id,name:user.name})
    }
    return res.status(401).json({message:'invalid email or password'})
  }
  catch(e){
    console.error(e)
    return res.status(500).json({message:'internal server error'})
  }
})
// app.post('/logout',async(req,res)=>{
//     res.clearCookie('token',{
//                                 httpOnly: true,
//                                 secure: process.env.NODE_ENV === 'production',
//                                 sameSite: 'strict',
//                                 maxAge: 24 * 60 * 60 * 1000 // 1 day
//     })
//     res.json({message:'loged out'})

// })
app.post('/logout',async(req,res)=>{
  try{res.json({message:'loged out successfully!'})}
  catch(e){
    console.error(e)
    return res.status(500).json({error:'internal server error'})
  }
})
app.post('/api/submit/complaints',authMiddleware,blockCheck,async (req,res)=>{
    try{
       const {studentID,title,description} = req.body
       console.log(studentID)
       console.log(title)
       console.log(description)
        const newComplient = new complaint(req.body)
        const savedComplient = await newComplient.save()
        res.status(201).json(savedComplient)
    }
  catch (e) {
        console.error('Detailed error:', e); // Add this line
        res.status(500).json({ 
            error: 'internal server error',
            message: e.message // Send error details to frontend
        });
    }
})
//the ff api is for admin to view all complaints
app.get('/api/complaints',async(req,res)=>{
  try{const complaints = await complaint.find()
    res.status(200).json(complaints)}
  catch(e){
    return res.status(500).send('internal server error')
  }
})
//this api is for student to show his only complaint
app.get("/api/complaints/mine", authMiddleware,blockCheck, async (req, res) => {
  try {
    // Use studentID to match your schema field name
    const complaints = await complaint.find({ studentID: req.user.id });
    
    res.json({ complaints });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error!" });
  }
});
//this api enable the admin to change the status of complaint in to resolve-pending-confirmation
app.put('/api/complaints/:id/resolve', async (req, res) => {
  try {
    const { id } = req.params;
    const { actionTaken } = req.body;

    // Validation
    if (!actionTaken?.trim()) {
      return res.status(400).json({ 
        error: 'Resolution action description is required' 
      });
    }

    // First find the complaint to validate its current state
    const existingComplaint = await complaint.findById(id);
    
    if (!existingComplaint) {
      return res.status(404).json({ error: 'complaint not found' });
    }

    // Check if complaint can be resolved (optional business logic)
    if (existingComplaint.status === 'closed') {
      return res.status(400).json({ 
        error: 'Cannot resolve a closed complaint' 
      });
    }

    // Update the complaint
    const updatedComplaint = await complaint.findByIdAndUpdate(
      id,
      {
        status: "pending_confirmation",
        resolvedAction: actionTaken.trim(),
        resolvedAt: new Date()
      },
      { new: true, runValidators: true } // Return updated doc + run schema validation
    );

    res.json({ 
      success: true,
      message: 'Complaint resolved successfully, pending user confirmation',
      complaint: updatedComplaint 
    });

  } catch (error) {
    console.error('Resolve error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: error.errors 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to resolve complaint',
      message: error.message 
    });
  }
});
app.put('/api/complaints/:id/confirm', authMiddleware, async (req, res) => {
  try {
    const studentID = req.user.id;
    const complaintID = req.params.id;

    // First, find the complaint to check ownership
    const specificComplaint = await complaint.findById(complaintID);

    // Check if complaint exists
    if (!specificComplaint) {
      return res.status(404).json({ error: 'Complaint not found!' });
    }

    // Check if the complaint belongs to the authenticated student
    // Convert both to string for proper comparison
    if (specificComplaint.studentID.toString() !== studentID) {
      return res.status(403).json({ error: 'This complaint is not yours!' });
    }

    // Check if complaint is in the correct status to be confirmed
    if (specificComplaint.status !== 'pending_confirmation') {
      return res.status(400).json({ 
        error: 'Complaint cannot be confirmed in its current status' 
      });
    }

    // Update the complaint status to closed
    const updatedComplaint = await complaint.findByIdAndUpdate(
      complaintID,
      { status: 'closed', closedAt: new Date() }, // Add closed timestamp
      { new: true, runValidators: true } // Return updated document
    );

    // Send success response
    res.json({ 
      message: 'Complaint successfully closed!', 
      complaint: updatedComplaint 
    });

  } catch (error) {
    console.error('Confirm error:', error);
    res.status(500).json({ error: 'Internal server error!' });
  }
});
app.put('/api/complaints/:id/reopen', authMiddleware, async (req, res) => {
  try {
    const studentID = req.user.id;
    const complaintID = req.params.id;
    const { reason } = req.body;

    // Validate input
    if (!reason || !reason.trim()) {
      return res.status(400).json({ error: 'Reopen reason is required' });
    }

    const specificComplaint = await complaint.findById(complaintID);
    
    if (!specificComplaint) {
      return res.status(404).json({ error: 'Complaint not found!' });
    }

    // Check ownership - convert ObjectId to string for comparison
    if (specificComplaint.studentID.toString() !== studentID) {
      return res.status(403).json({ error: 'This complaint does not belong to you!' });
    }

    // Check if complaint is in the correct status for reopening
    // Use the EXACT status value from your schema enum
    if (specificComplaint.status !== 'pending_confirmation') {
      return res.status(400).json({ 
        error: 'Cannot reopen complaint in its current status',
        currentStatus: specificComplaint.status,
        requiredStatus: 'pending_confirmation'
      });
    }

    // Update the complaint
    const updatedComplaint = await complaint.findByIdAndUpdate(
      complaintID,
      {
        reOpenedReason: reason.trim(),
        reOpenedCount: specificComplaint.reOpenedCount + 1,
        status: 'reopened' // Your schema's exact value
      },
      { new: true }
    );

    return res.status(200).json({
      complaint: updatedComplaint,
      message: 'Your feedback has been submitted! The admins will review your complaint again.'
    });

  } catch (error) {
    console.error('Reopen error:', error);
    return res.status(500).json({ error: 'Internal server error!' });
  }
});
//this enable admin to see all students
app.get('/api/manageStudents',authMiddleware,async(req,res)=>{
const adminID = req.user.id
const checkAdmin = await Admin.findById(adminID)
if(!checkAdmin){
  return res.status(409).send('you are not authenticated!')
}
const students = await Student.find()
return res.status(200).json({students})
})
   app.put('/api/students/:id/status', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !=='admin'){
      return res.send('you are not authorized to do this!')
    }
    const { status: newStatus } = req.body;
    const { id } = req.params;

    // 1. Validate input
    if (!newStatus || !['active', 'blocked'].includes(newStatus)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    // 2. Find student first to check existence and get email
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // 3. Prevent unnecessary updates
    if (student.status === newStatus) {
      return res.status(400).json({ error: `Student is already ${newStatus}` });
    }

    // 4. Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { 
        status: newStatus,
        ...(newStatus === 'blocked' && { blockedAt: new Date() }),
        ...(newStatus === 'active' && { blockedAt: null, blockedReason: null })
      },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password

    // // 5. Send email notification (async - don't wait for response)
    // if (newStatus === 'blocked') {
    //   emailService.sendEmail(
    //     student.email,
    //     'Account Status Update',
    //     'Your account has been blocked due to system policy violation.'
    //   ).catch(err => console.error('Email failed:', err));
    // } else if (newStatus === 'active') {
    //   emailService.sendEmail(
    //     student.email,
    //     'Account Status Update', 
    //     'Your account has been unblocked after review. You can now access the system normally.'
    //   ).catch(err => console.error('Email failed:', err));
    // }

    // 6. Send response
    res.json({
      message: `Student status updated to ${newStatus} successfully`,
      student: updatedStudent
    });

  } catch (error) {
    console.error('Status update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.delete('/api/students/delete/:id', authMiddleware, async (req, res) => {
  try {
    const { role } = req.user; // Destructure role from req.user
    const studentID = req.params.id;

    if (role !== 'admin') {
      return res.status(403).json({ error: 'You are not authorized to do this!' });
    }

    const student = await Student.findByIdAndDelete(studentID);
    
    if (!student) {
      return res.status(404).json({ error: 'Student not found!' });
    }

    return res.status(200).json({ message: 'Student account deleted successfully' });
  } catch (e) {
    console.error(e); // Log the error for debugging
    return res.status(500).json({ error: 'Internal server error!' });
  }
});
//the ff api is used for student to view his own profile 
app.get('/api/student/profile', authMiddleware, async (req, res) => {
  try {
    const studentID = req.user.id;
    const student = await Student.findById(studentID);

    if (!student) {
      return res.status(404).json({ message: 'Student not found!' });
    }

    return res.status(200).json(student);
  } catch (e) {
    console.error(e); // Log the error for debugging
    return res.status(500).json({ error: 'Internal server error!' });
  }
});
    // title: { 
    //     type: String, 
    //     trim: true, 
    //     required: true ,
    //     maxLength: 200
    // },
    // description: { 
    //     type: String, 
    //     trim: true, 
    //     required: true ,
    //     maxLength: 5000
    // },
    // status: { 
    //     type: String, 
    //     enum: ["submitted", "inProgress", "resolved", "pending_confirmation", "closed", "reopened"], 
    //     default: 'submitted' 
    // },
    // resolvedBy:{type:String,trim: true},
    // resolvedAction:{type:String,trim: true},
    // reOpenedCount:{type:Number,default:0},
    // studentID: { 
    //     type: mongoose.Schema.Types.ObjectId, 
    //     ref: 'Student',  // Use string reference
    //     required: true 
    // },