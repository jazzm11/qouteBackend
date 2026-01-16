const User = require('../models/userModel');
const argon2 = require('argon2');

// User sign up
exports.signUpUser = async (req, res) => {
    try {
    const { brukernavn, passord, repeatPassord } = req.body;
    const bruker = await User.findOne({ brukernavn });

    if (bruker) {
        return res.status(400).json({ message: 'Username already exists' });
    } else {
        if (passord === repeatPassord) {
            const hashedPassword = await argon2.hash(passord);
            const newUser = new User({ brukernavn, passord: hashedPassword });
            await newUser.save();
            console.log('User registered:', brukernavn);
            return res.status(201).json({ message: 'User registered successfully' });
        } else {
            res.status(400).json({ message: 'Passwords do not match' });
        }
    }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// User sign in
exports.signInUser = async (req, res) => {
    try {
        const { brukernavn, passord } = req.body;
        const bruker = await User.findOne({ brukernavn });

        if (bruker) {
            const validPassword = await argon2.verify(bruker.passord, passord);
            if (validPassword) {
                console.log('User logged in:', brukernavn);
                return res.status(200).json({ message: 'User logged in successfully' });
            } else {
                res.status(400).json({ message: 'Incorrect password' });
            }
        } else {
            res.status(400).json({ message: 'Invalid username' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};