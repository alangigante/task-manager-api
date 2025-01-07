const cron = require('node-cron');
const User = require('../models/User');
const Task = require('../models/Task');
const { sendBirthdayEmail, sendTaskNotificationEmail } = require('../services/emailService');

cron.schedule('30 8 * * *', async () => {
    console.log('Running birthday email scheduler...');
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const users = await User.findAll({ where: { birthdate: today } });

    for (const user of users) {
        await sendBirthdayEmail(user);
    }
});

cron.schedule('0 9 * * *', async () => {
    console.log('Running task notification scheduler...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];

    const tasks = await Task.findAll({ where: { startDate: formattedDate } });

    for (const task of tasks) {
        const user = await task.getUser(); // Supondo que a tarefa pertence a um usuário
        await sendTaskNotificationEmail(user, task);
    }
});
