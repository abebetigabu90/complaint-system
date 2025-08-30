import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js'
// Wrap in async function since top-level await may not be supported
// const adminSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true, lowercase: true },
//   password: { type: String, required: true },
//  });
 
// export const Admin = mongoose.model('Admin', adminSchema,'Admin');
const seedAdmin = async () => {
  try {
    const name = 'abebe';
    const email = 'abebetigabu90@gmail.com';
    const password = '1111';
    
    // Connect to database first
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/complient-system');
    
    // Check if admin exists
    const exists = await Admin.findOne({ email });
    
    if (exists) {
      console.log('Admin already exists!');
      return;
    }
    
    // Create new admin
    const hashed = await bcrypt.hash(password, 10);
    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password: hashed
    });
    
    if (admin) {
      console.log('Admin created successfully:', admin);
    } else {
      console.error('Error creating admin!');
    }
    
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
};

// Execute the function
seedAdmin();