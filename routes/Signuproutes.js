const express = require('express');
const User = require('./models/usermodel'); // Adjust the path to your user model file
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    // Check if all fields are provided
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    // Save the user to the database
    await newUser.save();

    // Redirect or send a response after successful signup
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
});
