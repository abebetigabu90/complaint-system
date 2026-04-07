import mongoose from 'mongoose'
const complaintSchema = new mongoose.Schema({
    complaintType: {
    type: String,
    enum: ['cafa', 'library', 'dormitory', 'class', 'registrar', 'department', 'other'],
    required:true,
    default:'other'
    } ,
   title: { 
        type: String, 
        trim: true, 
        required: true ,
        maxLength: 200
    },
    description: { 
        type: String, 
        trim: true, 
        required: true ,
        maxLength: 5000
    },
    status: { 
        type: String, 
        enum: ["submitted", "inProgress", "resolved", "pending_confirmation", "reopened", "closed"], 
        default: 'submitted' 
    },
    resolvedBy:{type:String,trim: true},
    resolvedAction:{type:String,trim: true},
    resolvedAt:{type:Date},
    reOpenedReason:{type:String},
    reOpenedCount:{type:Number,default:0},
    reSolvedCount:{type:Number,default:0},
    studentID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student',  // Use string reference
        required: true 
    },
    // assignedPerson: { type: String }
}, { timestamps: true });
complaintSchema.index({ createdAt: -1 });
const complaint = mongoose.model('complaint', complaintSchema);
export default complaint