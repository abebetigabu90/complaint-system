// import mongoose from 'mongoose';

// const complaintSchema = new mongoose.Schema({
//     title: { 
//         type: String, 
//         trim: true, 
//         required: true 
//     },
//     description: { 
//         type: String, 
//         trim: true, 
//         required: true 
//     },
//     status: { 
//         type: String, 
//         enum: ["Pending", "In Progress", "Resolved"], 
//         default: 'Pending' 
//     },
//     studentID: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'Student',  // Use string reference
//         required: true 
//     },
//     // assignedPerson: { type: String }
// }, { timestamps: true });

// export default mongoose.model('Complaint', complaintSchema);