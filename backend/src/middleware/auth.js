// import jwt from 'jsonwebtoken'
// const authMiddleware =function(req,res,next){
//     try {const token = req.cookies?.token||(req.headers.authorization && req.headers.authorization.split(' ')[1])
//         if(!token){
//             return res.status(401).json({message:"unauthorized access!"})
//         }
//         const decoded = jwt.verify(token,process.env.JWT_SECRET)
//         req.userId = decoded.id
//         next()}
//     catch(e){
//         return res.status(401).json({message: 'Invalid token'})
//     }
// }
// export default authMiddleware
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        
        // Check if header exists and has correct format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token, authorization denied!' });
        }
        
        // Extract token safely
        const parts = authHeader.split(' ');
        if (parts.length !== 2) {
            return res.status(401).json({ message: 'Token format invalid' });
        }
        
        const token = parts[1];
        
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Add user info to request
        req.user = {
            id: decoded.id,
            role: decoded.role
        };
        
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

export default authMiddleware;