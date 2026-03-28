const authenticate = (req, res, next) => {
    // A simple static bearer token middleware for the authentication bonus. 
    // In production, this would verify a dynamically generated JWT token.
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'Authentication required. Missing Bearer Token.' });
    }

    const token = authHeader.split(' ')[1];
    
    // Hardcoded token for demo purposes
    if (token !== 'secret-token') {
        return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
    }

    next();
};

module.exports = authenticate;
