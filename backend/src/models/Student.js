import mongoose from 'mongoose'
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['active', 'blocked'], 
    default: 'active' 
  },
  blockedAt: { type: Date },       // ← Your field
  blockedReason: { type: String, default: null }, // ← Your field
  blockedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
}, { timestamps: true });
const Student = mongoose.model('Student', studentSchema);
export default Student