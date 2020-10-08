export default function api(path, options) {
  // TODO use this when ready for real prod build/test
  return fetch(`http://localhost:3000${path}`, options)
    .then(resp => resp.json())
  // TODO for use when stubbing to test
  // return Promise.resolve([
  //   {
  //       "start": "2020-10-10T15:12:00.000Z",
  //       "end": "2020-10-10T16:12:00.000Z",
  //       "summary": "Cabin1zz feed booked (Chaz)",
  //       "description": "It works ;)",
  //       "location": "my room",
  //       "url": "http://test-url.com/",
  //       "id": 1
  //   }
  // ])
}