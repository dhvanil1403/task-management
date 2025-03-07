const sequelize = require('./config/database');
const Employee = require('./models/employee');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); // Use force: true to drop existing tables and recreate them

    // Sample data for employees
    const employees = [
        {
            name: 'drashti manager',
            email: 'drashtichauhan414@gmail.com',
            password: await bcrypt.hash('password123', 10), // Hash the password
            role: 'manager',
        },
        {
            name: 'drashti manager',
            email: 'jiyuchauhan511@gmail.com',
            password: await bcrypt.hash('password123', 10), // Hash the password
            role: 'manager',
        },
        {
            name: 'drashti',
            email: 'drashtichauhan414@gmail.com',
            password: await bcrypt.hash('password123', 10), // Hash the password
            role: 'manager',
        },
        {
            name: 'sujaltest1234@gmail.com',
            email: 'sujaltest1234@gmail.com',
            password: await bcrypt.hash('password123', 10), // Hash the password
            role: 'employee',
        },
    ];

    // Insert sample employees into the database
    await Employee.bulkCreate(employees);
    console.log('Sample employees added to the database.');

    // Optionally, you can add sample leaves or attendance records here

    process.exit();
};

seedDatabase();
