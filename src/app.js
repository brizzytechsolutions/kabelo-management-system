const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth-routes');
const stockRoutes = require('./routes/stock-routes');
const accessoryRoutes = require('./routes/accessory-routes');
const testRoutes = require('./routes/test');
const swagger = require('./swagger');
const path = require('path');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/stock', stockRoutes);
app.use('/api/accessory', accessoryRoutes);
app.use('/api/test', testRoutes);

swagger(app);

const errorMiddleware = require('./middlewares/error-middleware');
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
