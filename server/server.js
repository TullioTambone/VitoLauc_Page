const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// app.use(cors());
// app.use(express.json());
// app.use(fileUpload());
// app.use('/uploads', express.static('uploads'));

// Routes
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/private');
const photoRoutes = require('./routes/photos');
const categoryRoutes = require('./routes/categories');

app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
