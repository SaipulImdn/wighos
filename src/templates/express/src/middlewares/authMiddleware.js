const authMiddleware = (req, res, next) => {
    // Implementasi logika autentikasi
    // Misalnya, memeriksa token JWT
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Access Denied' });
    }
    next();
  };
  
  module.exports = authMiddleware;
  