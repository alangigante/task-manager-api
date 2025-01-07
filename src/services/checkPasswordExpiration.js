module.exports = (req, res, next) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const passwordAge = new Date() - new Date(user.passwordChangedAt);
    const maxAge = 30 * 24 * 60 * 60 * 1000; // 30 dias

    if (passwordAge > maxAge) {
        return res.status(403).json({ message: 'Your password has expired. Please update your password.' });
    }

    next();
};
