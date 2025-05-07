// Import required modules
const express = require('express');
const path = require('path');
const fs = require('fs');

// Create Express application
const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory

// Set up handlebars as the template engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views')); // Updated path for views

// Initialize profiles.json if it doesn't exist
const profilesFilePath = path.join(__dirname, 'data', 'profiles.json');
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  console.log('Creating data directory...');
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(profilesFilePath)) {
  console.log('Creating profiles.json file...');
  fs.writeFileSync(profilesFilePath, '[]'); // Initialize with an empty array
}

// Routes for CRUD operations

// Read: Display all profiles
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Route to render profiles.hbs
app.get('/profiles', (req, res) => {
  const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf8')); // Read profiles from profiles.json
  res.render('profiles', { profiles }); // Render profiles.hbs with the profiles data
});
// Create: Add a new profile
app.post('/addProfile', (req, res) => {
  const { username, firstName, lastName, pronouns, team, country, bio } = req.body;

  const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf8'));
  const newProfile = {
    id: Date.now(), // Unique ID for the profile
    username,
    firstName,
    lastName,
    pronouns,
    team,
    country,
    bio,
  };

  profiles.push(newProfile);
  fs.writeFileSync(profilesFilePath, JSON.stringify(profiles, null, 2));
  res.redirect('/');
});

// Update: Edit an existing profile
// Update: Edit an existing profile
app.post('/editProfile', (req, res) => {
  const { id, username, firstName, lastName, pronouns, team, country, bio } = req.body;

  const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf8'));
  const profileIndex = profiles.findIndex((profile) => profile.id === parseInt(id));

  if (profileIndex !== -1) {
    profiles[profileIndex] = {
      id: parseInt(id),
      username,
      firstName,
      lastName,
      pronouns,
      team,
      country,
      bio,
    };
    fs.writeFileSync(profilesFilePath, JSON.stringify(profiles, null, 2));
  }

  res.redirect('/profiles');
});

// Delete: Remove a profile
app.get('/deleteProfile', (req, res) => {
  const { id } = req.query;

  const profiles = JSON.parse(fs.readFileSync(profilesFilePath, 'utf8'));
  const updatedProfiles = profiles.filter((profile) => profile.id !== parseInt(id));

  fs.writeFileSync(profilesFilePath, JSON.stringify(updatedProfiles, null, 2));
  res.redirect('/');
});

// Start the server
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});