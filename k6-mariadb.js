import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

let myRate = new Rate('my_rate');

export let options = {
    vus: 100,
    iterations: 10000
};

// export default function() {
//   let responses = http.batch([
//     ["GET", 'http://localhost:3010/products/8273197'],
//     ["GET", 'http://localhost:3010/products/2284985'],
//     ["GET", 'http://localhost:3010/products/7339283']
//   ]);
//
//   check(responses[0], {
//     "main page status was 200": res => res.status === 200,
//   });
//
//   let res = http.get('http://localhost:3010/products/8273197');
//   myRate.add(res.error)
//   sleep(1);
// };

export default function() {
  let userDistro = Math.floor(Math.random() * 100);

  switch (true) {
    case (userDistro <= 33):
      http.get('http://localhost:3010/products/8273197');
      break;
    case (userDistro > 33 && userDistro <= 66):
      http.get('http://localhost:3010/products/2284985');
      break;
    case (userDistro > 66 && userDistro < 100):
      http.get('http://localhost:3010/products/7339283');
      break;
    default:
      http.get("http://test.loadimpact.com?switch=default");
      break;

  sleep(1);
  }
};
