import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  stages: [
    { duration: '2m', target: 100 }, // Below normal load
    { duration: '5m', target: 100 },
    { duration: '2m', target: 200 }, // Normal load
    { duration: '5m', target: 200 },
    { duration: '2m', target: 300 }, // Around the breaking point
    { duration: '5m', target: 300 },
    { duration: '2m', target: 400 }, // Beyond the breaking point
    { duration: '5m', target: 400 },
    { duration: '10m', target: 0 }   // Scale down.  Recovery stage.
  ]
};

const BASE_URL = 'http://localhost:3030/products';

export default () => {
  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/5e097e8caef09d70882401b1/`,
      null,
      { tags: { ctype: 'html', name: 'Practical Steel Computer' } }
    ],
    [
      'GET',
      `${BASE_URL}/5e0980735349f02e58c8e643/`,
      null,
      { tags: { ctype: 'html', name: 'Intelligent Plastic Bike' } }
    ],
    [
      'GET',
      `${BASE_URL}/5e0980925349f02e58d1c27c/`,
      null,
      { tags: { ctype: 'html', name: 'Gorgeous Concrete Sausages' } }
    ],
    [
      'GET',
      `${BASE_URL}/5e0a204fefa1974cfc522e50/`,
      null,
      { tags: { ctype: 'html', name: 'Generic Plastic Fish' } }
    ]
  ]);

  sleep(1);
};
