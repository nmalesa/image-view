import http from 'k6/http';
import { check, group, sleep, fail } from 'k6';

export let options = {
  vus: 1,  // 1 user looping for 1 minute
  duration: '1m',
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  }
};

const BASE_URL = 'http://localhost:3000';

export default () => {
  let image = http.get(`${BASE_URL}/8629947`);

  check(image, {
    'status was 200': r => r.status == 200,
    'transaction time OK': r => r.timings.duration < 200,
    'retrieved image': obj => obj.length > 0
  });

  sleep(1);
};
