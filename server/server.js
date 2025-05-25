

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use('/uploads', express.static('uploads'));

// Routes
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
const auth = require('./routes/auth');
const trashRoutes = require('./routes/trash');

app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', auth);
app.use('/api/trash', trashRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
