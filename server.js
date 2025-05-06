const express = require('express');
const multer = require('multer');
const path = require('path');
const exphbs = require('express-handlebars');
const fs = require('fs')
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

app.post('/save', (req, res) => { //creates a POST for /save
    const {taskNumber, taskDescription, taskDate, taskStatus, } = req.body; //extracts these from req.body
  
    const filePath = path.join(__dirname, 'data', 'data.json'); //creates a path to todolst.json
    const todoList = JSON.parse(fs.readFileSync(filePath)); //creates a todoList
  
    profile[profileNumber] = { //object for todolist.JSON 
      username: firstName,
      taskDate,
      taskStatus: taskStatus
  
    }
    fs.writeFileSync(filePath, JSON.stringify(todoList, null, 2)); //writes new data to JSON
    res.redirect('/'); //redirects client back to home page
  })
  
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


// Handle profile form submission and render profile preview
app.post('/addProfile', upload.single('profilePicture'), (req, res) => {
    const { username, firstName, lastName, pronouns, team, country, bio } = req.body;

    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

    const newProfile = {
        username,
        firstName,
        lastName,
        pronouns,
        team: team || "Not selected",
        country,
        bio,
        profilePicture
    };

    // Save the profile to data.json
    const filePath = path.join(__dirname, 'data', 'data.json');
    let profiles = [];
    if (fs.existsSync(filePath)) {
        try {
            const fileData = fs.readFileSync(filePath, 'utf8');
            profiles = JSON.parse(fileData || '[]'); // Handle empty file
        } catch (error) {
            console.error('Error parsing JSON:', error);
            profiles = [];
        }
    }
    profiles.push(newProfile);
    fs.writeFileSync(filePath, JSON.stringify(profiles, null, 2));

    // Render the profile preview
    res.render('profiles', { user: newProfile });
    
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
});
   
// Start the server
