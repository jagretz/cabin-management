import React from 'react';
import api from '../lib/api'

export default class Form extends React.Component {
  INIT_FORM = {
    start: '2020-10-10',
    end: '2020-10-11',
    summary: "Cabin1 feed booked (Chaz)",
    description: "It works ;)",
    location: "my room",
    url: "http://test-url.com/",
  }

  constructor(props) {
    super(props);
    this.state = {
      form: this.INIT_FORM,
      events: [],
      isVisible: false
    }
  }

  componentDidMount() {
    api('/api/v1/calendars/cabin1/events')
      .then(({ events }) => {
        this.setState({
          events
        })
      })
  }

  saveEvent(e) {
    e.preventDefault();
    const { events, form } = this.state;
    const toEvent = form => ({
      ...form,
      start: new Date(form.start).toISOString(),
      end: new Date(form.end).toISOString()
    })

    api('/api/v1/calendars/cabin1/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toEvent(form))
    })
      .then(({ event }) => {
        this.setState({
          events: [...events, event],
          form: { ...this.INIT_FORM },
        })
      })
  }

  updateFormState(e, field, value) {
    this.setState({
      form: {
        ...this.state.form,
        [field]: value
      }
    });
  }

  render() {
    const { events, form } = this.state;
    return (
      <div>
        <form>
          <div>
            <span>Start date: </span>
            <input
              type="date"
              id="start"
              name="start-date"
              min="2020-09-01"
              max="2020-11-01"
              value={form.start}
              onChange={e => this.updateFormState(e, 'start', e.target.value)}
            />
          </div>
          <div>
            <span>End date: </span>
            <input
              type="date"
              id="end"
              name="end-date"
              min="2020-09-01"
              max="2020-11-01"
              value={form.end}
              onChange={e => this.updateFormState(e, 'end', e.target.value)}
            />
          </div>
          <div>
            <span>Summary: </span>
            <input
              type="text"
              value={form.summary}
              onChange={e => this.updateFormState(e, 'summary', e.target.value)}
            />
          </div>
          <div>
            <span>Description: </span>
            <input
              type="text"
              value={form.description}
              onChange={e => this.updateFormState(e, 'description', e.target.value)}
            />
          </div>
          <div>
            <span>Location: </span>
            <input
              type="text"
              value={form.location}
              onChange={e => this.updateFormState(e, 'location', e.target.value)}
            />
          </div>
          <div>
            <span>url: </span>
            <input
              type="text"
              value={form.url}
              onChange={e => this.updateFormState(e, 'url', e.target.value)}
            />
          </div>
          {/* <div>
            <span>Drink: </span>
            <select
              value={form.drink}
              onChange={e =>this.updateFormState(e, 'drink', e.target.value)}
            >
              <option value="dew">Mtn Dew</option>
              <option value="pepsi">Pepsi</option>
            </select>
          </div>
          <div>
            <span>Fruits: </span>
            <select
              multiple={true}
              value={form.fruits}
              onChange={e =>this.updateFormState(e, 'fruits', Array.from(e.target.selectedOptions, (item) => item.value))}
            >
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="cherry">Cherry</option>
            </select>
          </div> */}
          <button onClick={e => this.saveEvent(e)}>Save event</button>
        </form>
        {
          events.length === 0
            ? <p>No events to show...</p>
            : <p>{JSON.stringify(events, null, 2)}</p>
        }
      </div>
    )
  }
}