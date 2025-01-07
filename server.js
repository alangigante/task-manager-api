require('dotenv').config();
const express =  require('express');
const bodyParser = require('body-parser');
require('./src/services/emailScheduler');
const sequelize = require('./src/config/database');

const app = express();
app.use(bodyParser.json());

const userRoutes =  require('./src/routes/userRoutes');
const taskRoutes =  require('./src/routes/taskRoutes');


app.use('/api/users', userRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 3000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully!');

        await sequelize.sync({ force: false });

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();