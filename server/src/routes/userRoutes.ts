import express from 'express';
import passport from 'passport';
import User from '../models/user';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Logged in successfully' });
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(400).json({ message: err.message });
    res.status(200).json({ message: 'Logged out successfully' });
  });
});

export default router;
