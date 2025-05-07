// Import required modules
const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');

// Initialize the Express application
const app = express();

// Set up Handlebars as the templating engine
const { create } = require('express-handlebars'); // Updated import for express-handlebars
const hbs = create({ extname: '.hbs' }); // Create an instance of express-handlebars
app.engine('hbs', hbs.engine); // Use the engine instance
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); // Ensure views directory is set

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files (CSS, JS, etc.)
// Route to render the profile page as the default page
app.get('/', (req, res) => {
    console.log('Rendering profiles.hbs');
    res.render('profiles', { user: null }); // Pass user data if available
});

// Route to handle form submission
app.post('/addProfile', (req, res) => {
    // Here you would handle the profile data submission
    const userProfile = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        pronouns: req.body.pronouns,
        team: req.body.team,
        country: req.body.country,
        bio: req.body.bio,
        profilePicture: req.file ? req.file.path : null // Handle file upload
    };

    // Render the profile page with the submitted user data
    res.render('profiles', { user: userProfile });
});

// Start the server
const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});