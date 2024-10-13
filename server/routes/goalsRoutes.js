const express = require('express');
const { getGoals, addGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const router = express.Router();

// Define the routes
router.get('/', getGoals); // GET all goals
router.post('/', addGoal); // POST a new goal
router.put('/:id', updateGoal); // PUT to update a goal by ID
router.delete('/:id', deleteGoal); // DELETE a goal by ID

module.exports = router;
