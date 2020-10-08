const DATA = {};
const nextId = () => {
  const currentIds = Object.keys(DATA);
  if (currentIds.length === 0) {
    return 1;
  }
  return currentIds.sort().slice(-1) + 1;
};

async function create(event) {
  const newEvent = {
    ...event,
    id: nextId(),
  };
  DATA[newEvent.id] = newEvent;
  return newEvent;
}

async function getAll() {
  const events = Object.keys(DATA).reduce((accum, key) => [...accum, DATA[key]], []);
  return events;
}

module.exports = {
  create,
  getAll,
};
