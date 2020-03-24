
import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1, // 1 user looping for 1 minute
  duration: '1m',
  thresholds: {
    http_req_duration: ['p(99)<1500']
  }
};

const BASE_URL = 'http://localhost:3030/products';

export default () => {
  let image = http.get(`${BASE_URL}/5e0980925349f02e58d1c27b/`);

  // check(image, { 'retrieved image': (obj) => obj.length > 0 });

  check(image, {
    'status was 200': r => r.status === 200
  });

  sleep(1);
};

// SQL Endpoint:  8629947

// NoSQL Endpoint:  5e0980925349f02e58d1c27b
