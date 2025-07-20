const Event = require('../models/Event');

// createEvent and deleteEvent functions remain the same...
exports.createEvent = async (req, res) => {
  const { title, description, date, time, location, notes, category } = req.body;
  const eventDateTime = new Date(`${date}T${time}`);

  if (isNaN(eventDateTime.getTime())) {
    return res.status(400).json({ error: 'Invalid date or time format provided.' });
  }

  try {
    const event = await Event.create({
      user: req.user.id,
      title, description, date: eventDateTime, time, location, notes, category,
      reminderSent: false, isCompleted: false
    });
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create the event.' });
  }
};


/**
 * MODIFICATION: The getEvents function is updated to handle the new 'isCompleted' filter.
 * The sorting by date is already correctly implemented, fulfilling the second request.
 */
exports.getEvents = async (req, res) => {
  try {
    const { search, category, isCompleted } = req.query;

    // Base filter: always get events for the currently authenticated user
    const filter = { user: req.user.id };

    // Add search term to filter (if provided)
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }

    // Add category to filter (if provided)
    if (category) {
      filter.category = category;
    }

    // NEW: Add completion status to filter (if provided)
    // It will check for 'true' or 'false' as strings.
    if (isCompleted === 'true') {
      filter.isCompleted = true;
    } else if (isCompleted === 'false') {
      filter.isCompleted = false;
    }

    // Find events based on the combined filter and sort them by date.
    // This sorting fulfills the requirement to sort by date and time on the dashboard.
    const events = await Event.find(filter).sort({ date: 1 });
    
    res.json(events);

  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to retrieve events.' });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!event) {
      return res.status(404).json({ message: 'Event not found or user not authorized.' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete the event.' });
  }
};