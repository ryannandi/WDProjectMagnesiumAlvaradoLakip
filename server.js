const express = require('express');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});
const upload = multer({ storage: storage });

// Render the user form
app.get('/userform', (req, res) => {
    res.render('userform');
});

// Handle form submission
app.post('/submit', upload.single('profilePicture'), (req, res) => {
    const userData = {
        username: req.body.username,
        pronouns: req.body.pronouns,
        bio: req.body.bio,
        country: req.body.country,
        profilePicture: req.file ? `/uploads/${req.file.filename}` : null
    };
    
    // Render the main page with user data
    res.render('main', { user: userData });
});

// Start the server
