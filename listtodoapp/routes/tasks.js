const express = require('express');
const Task = require('../models/Task'); // adjust path if needed
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all tasks for the logged-in user (owned or shared)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({
      $or: [
        { owner: req.user.id },
        { sharedWith: req.user.id }
      ]
    })
    .sort({ due: 1 })
    .lean(); // improves performance for read-only

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});

// Create a new task
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, due, status, sharedWith } = req.body;

    if (!title || !due) {
      return res.status(400).json({ message: 'Title and due date are required' });
    }

    const task = new Task({
      title,
      description,
      due,
      status: status || 'pending',
      owner: req.user.id,
      sharedWith: sharedWith || []
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create task', error: err.message });
  }
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const allowedUpdates = ['title', 'description', 'due', 'status', 'sharedWith'];
    const updates = {};

    allowedUpdates.forEach((key) => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      updates,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    res.json(task);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update task', error: err.message });
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user.id });

    if (!task) {
      return res.status(404).json({ message: 'Task not found or not authorized' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting task' });
  }
});

module.exports = router;
