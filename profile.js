// routes/profile.js
const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Profile route (protected route)
router.get('/profile', async (req, res) => {
    if (!req.session.userId) {
        return res.redirect('/login'); // Redirect to login if not authenticated
    }

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/login?error=User not found');
        }

        res.render('profile', { user }); // Pass user data to the profile view
    } catch (error) {
        res.redirect(`/home?error=Error fetching profile: ${error.message}`);
    }
});

module.exports = router;
