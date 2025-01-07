const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendConfirmationEmail } = require('../services/emailService');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const confirmationCode = crypto.randomBytes(4).toString('hex');

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            confirmationCode,
        });

        await sendConfirmationEmail(email, confirmationCode);

        res.status(201).json({ message: 'User registered! Check your email to confirm your account.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isReused = user.passwordHistory.some(async (oldPasswordHash) => {
            return await bcrypt.compare(newPassword, oldPasswordHash);
        });

        if (isReused) {
            return res.status(400).json({ message: 'New password cannot be one of the last 5 passwords used' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.passwordChangedAt = new Date();

        user.passwordHistory = [
            hashedPassword,
            ...user.passwordHistory.slice(0, 4),
        ];

        await user.save();

        res.status(200).json({ message: 'Password updated successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.confirmUser = async (req, res) => {
    try {
        const { email, code } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.confirmationCode !== code) {
            return res.status(400).json({ message: 'Invalid confirmation code' });
        }

        user.isConfirmed = true;
        user.confirmationCode = null;
        await user.save();

        res.status(200).json({ message: 'Account confirmed successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.name = name;
        user.email = email;
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};
