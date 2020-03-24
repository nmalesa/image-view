import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 100 }, // Below normal load
    { duration: '1m', target: 100 },
    { duration: '10s', target: 1400 }, // Spike to 1400 users
    { duration: '3m', target: 1400 }, // Stay at 1400 users for 3 minutes
    { duration: '10s', target: 100 }, // Scale down.  Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '10s', target: 0 }
  ]
};

const BASE_URL = 'http://localhost:3030/products';

export default () => {
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/5e097e8caef09d70882401b0/`,
      null,
      { tags: { ctype: 'html', name: 'Practical Steel Computer' } }
    ],
    [
      'GET',
      `${BASE_URL}/5e0980735349f02e58c8e642/`,
      null,
      { tags: { ctype: 'html', name: 'Intelligent Plastic Bike' } }
    ],
    [
      'GET',
      `${BASE_URL}/5e0980925349f02e58d1c27b/`,
      null,
      { tags: { ctype: 'html', name: 'Gorgeous Concrete Sausages' } }
    ],
    [
      'GET',
      `${BASE_URL}/5e0a204fefa1974cfc522e59/`,
      null,
      { tags: { ctype: 'html', name: 'Generic Plastic Fish' } }
    ]
  ]);

  sleep(1);
};
