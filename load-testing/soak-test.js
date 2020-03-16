import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 400 }, // Ramp up to 400 users
    { duration: '3h56m', target: 400 }, // Stay at 400 for approximately 4 hours
    { duration: '2m', target: 0 } // Scale down
  ]
};

const BASE_URL = 'http://localhost:3030/products';

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
