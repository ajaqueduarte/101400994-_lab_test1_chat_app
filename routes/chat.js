const express = require('express');
const router = express.Router();
const GroupMessage = require('../models/GroupMessage');
const PrivateMessage = require('../models/PrivateMessage');

// Route to get the chat messages for a group
router.get('/group/:room', async (req, res) => {
  try {
    const messages = await GroupMessage.find({ room: req.params.room })
      .populate('from_user', 'username')
      .sort('date_sent');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to post a new message to a group
router.post('/group/:room', async (req, res) => {
  const message = new GroupMessage({
    from_user: req.body.userId, // Assuming you have the userId stored in the request body
    room: req.params.room,
    message: req.body.message
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get private messages between two users
router.get('/private/:userId/:receiverId', async (req, res) => {
  try {
    const messages = await PrivateMessage.find({
      $or: [
        { from_user: req.params.userId, to_user: req.params.receiverId },
        { from_user: req.params.receiverId, to_user: req.params.userId }
      ]
    })
    .populate('from_user to_user', 'username')
    .sort('date_sent');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to post a new private message
router.post('/private', async (req, res) => {
  const message = new PrivateMessage({
    from_user: req.body.fromUserId, // Sender's user ID
    to_user: req.body.toUserId, // Receiver's user ID
    message: req.body.message
  });

  try {
    const newMessage = await message.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
