const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await Employee.findOne({ where: { email } });

    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userId = user.id; // Store user ID in session
            req.session.role = user.role; // Store user role in session
            return res.redirect(`/${user.role}/dashboard`);
        }
    }
    res.status(401).send('Invalid email or password');
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/login');
};