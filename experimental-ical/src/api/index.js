const router = require('express').Router();
const ical = require('ical-generator');

const EventsService = require('../services/events');

// Doesn't have to end in .ics in order to be subscribable
router.get('/calendars/cabin1/feed', async (req, res) => {
  console.log(`Feed request at ${new Date().toISOString().slice(0, 16)}`);

  const cal = ical({ domain: 'test-domain.com', name: 'Cabin1 iCal' });
  const eventsService = new EventsService();
  const events = await eventsService.getAll();
  events.forEach((event) => {
    cal.createEvent(event);
  });
  cal.serve(res);
});

router.get('/calendars/cabin1/events', async (req, res) => {
  const eventsService = new EventsService();
  try {
    const events = await eventsService.getAll();
    res.json({
      success: true,
      error: null,
      events,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.toString(),
      events: [],
    });
  }
});

router.post('/calendars/cabin1/events', async (req, res) => {
  const eventsService = new EventsService();
  try {
    const {
      start,
      end,
      summary,
      description,
      location,
      url,
    } = req.body;
    const newEvent = await eventsService.add({
      start,
      end,
      summary,
      description,
      location,
      url,
    });
    res.json({
      success: true,
      error: null,
      event: newEvent,
    });
  } catch (e) {
    res.json({
      success: false,
      error: e.toString(),
      event: null,
    });
  }
});

module.exports = router;
