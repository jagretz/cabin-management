const { create, getAll } = require('../repositories/events');

class EventsService {
  /* eslint-disable class-methods-use-this */
  async add(event) {
    const newEvent = await create(event);
    return newEvent;
  }

  async getAll() {
    const events = await getAll();
    return events;
  }
}

module.exports = EventsService;
