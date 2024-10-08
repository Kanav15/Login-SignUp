// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
    const { username, password, role, department, currentYear, division, studentId } = req.body;

    // Check if password length is at least 8 characters
    if (password.length < 8) {
        return res.redirect('/signup?error=Password must be at least 8 characters long');
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.redirect('/signup?error=Username already exists');
    }

    // Validate student-related fields if the role is 'student'
    if (role === 'student') {
        if (!department || !currentYear || !division || !studentId) {
            return res.redirect('/signup?error=Please fill all required student details');
        }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        password: hashedPassword,
        role,
        department: role === 'student' ? department : null, // Only set for students
        currentYear: role === 'student' ? currentYear : null, // Only set for students
        division: role === 'student' ? division : null, // Only set for students
        studentId: role === 'student' ? studentId : null // Only set for students
    });

    try {
        await user.save();
        req.session.userId = user._id; // Set user session
        res.redirect('/home'); // Redirect to home after signup
    } catch (error) {
        res.redirect(`/signup?error=Error registering user: ${error.message}`);
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.redirect('/login?error=User not found');
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.redirect('/login?error=Invalid credentials');
    }

    req.session.userId = user._id; // Set user session
    res.redirect('/home'); // Redirect to home after login
});

// Logout route
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login'); // Redirect to login after logout
});

module.exports = router;

