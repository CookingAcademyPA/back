module.exports = (req, res, next) => {
    const userIsAdmin = req.isAdmin;

    if (userIsAdmin) {
        next();
    } else {
        return res.status(403).json({ error: 'You are not authorized to perform this action.' });
    }
};
