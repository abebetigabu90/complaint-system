import Student from '../models/Student.js'
const blockCheck = async (req, res, next) => {
  if (req.user.role === 'student') {
    const student = await Student.findById(req.user.id);
    if (student.status === 'blocked') {
      return res.status(403).json({ 
        error: 'Blocked account cannot perform this action' 
      });
    }
  }
  next();
};
export default blockCheck