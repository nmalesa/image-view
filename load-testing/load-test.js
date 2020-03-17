import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  stages: [
    { duration: '5m',  target: 60 }, // Simulate ramp-up of traffic from 1 to 60 users over 5 minutes.
    { duration: '10m', target: 60 }, // Stay at 60 users for 10 minutes
    { duration: '3m',  target: 100 }, // Ramp-up to 100 users over 3 minutes (peak hour starts)
    { duration: '2m',  target: 100 }, // Stay at 100 users for short amount of time (peak hour)
    { duration: '3m',  target: 60 }, // Ramp-down to 60 users over 3 minutes (peak hour ends)
    { duration: '10m', target: 60 }, // Continue at 60 for additional 10 minutes
    { duration: '5m',  target: 0 }  // Ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'],
  }
};

const BASE_URL = 'http://localhost:3030/products';

// export default () => {
//   let image = http.get(`${BASE_URL}/8629947/`).json();
//
//   check(image, { 'retrieved image': (obj) => obj.length > 0 });
//
//   sleep(1);
// };

export default () => {
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/6384294/`,
      null,
      { tags: { ctype: 'html', name: 'Practical Steel Computer' } }
    ],
    [
      'GET',
      `${BASE_URL}/7049283/`,
      null,
      { tags: { ctype: 'html', name: 'Intelligent Plastic Bike' } }
    ],
    [
      'GET',
      `${BASE_URL}/8629947/`,
      null,
      { tags: { ctype: 'html', name: 'Gorgeous Concrete Sausages' } }
    ],
    [
      'GET',
      `${BASE_URL}/9858273`,
      null,
      { tags: { ctype: 'html', name: 'Generic Plastic Fish' } }
    ]
  ]);
  
  sleep(1);
};
