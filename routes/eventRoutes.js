const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createEvent, getEvents, deleteEvent
} = require('../controllers/eventController');

router.post('/', auth, createEvent);
router.get('/', auth, getEvents);
router.delete('/:id', auth, deleteEvent);

module.exports = router;
