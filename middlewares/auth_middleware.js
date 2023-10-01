const jwt= require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    const tokenSecret = process.env.JWT_SECRET

    if (!token) {
        return res.status(401).json({ error: 'A token is required.' });
    }

    try {
        const decoded = jwt.verify(token, tokenSecret);

        req.userId = decoded.userId;
        req.isAdmin = decoded.isAdmin;

        next();
    } catch (error) {
        console.error('Verification error of the token: ', error.message);
        return res.status(403).json({ error: 'Invalid token.' });
    }
};
