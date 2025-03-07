const sequelize = require('./config/database');
const Employee = require('./models/Employee');
const bcrypt = require('bcrypt');

const seedDatabase = async () => {
    await sequelize.sync({ force: true }); // Use force: true to drop existing tables and recreate them

    // Sample data for employees
    const employees = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: await bcrypt.hash('password123', 10), // Hash the password
            role: 'manager',
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            password: await bcrypt.hash('password123', 10), // Hash the password
            role: 'employee',
        },
        {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            password: await bcrypt.hash('password123', 10), // Hash the password
            role: 'employee',
        },
        {
            name: 'Bob Brown',
            email: 'bob.brown@example.com',
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