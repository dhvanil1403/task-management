const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const dotenv = require('dotenv');
const { syncDB } = require('./models');
const pool = require('./config/database');

dotenv.config();

const app = express();

// Set EJS as view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Enable layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Routes
const employeeRoutes = require('./routes/employee');
const managerRoutes = require('./routes/manager');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/auth');

app.use('/', authRoutes);
app.use('/tasks', taskRoutes);
app.use('/employee', employeeRoutes);
app.use('/manager', managerRoutes);

const PORT = process.env.PORT || 3000;

syncDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => console.error("Database sync error:", err));
