const sequelize = require('../config/database');
const Task = require('./task');

const syncDB = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
};

module.exports = { sequelize, Task, syncDB };
