import http from 'k6/http';
import { sleep } from 'k6';

export default function() {
  http.get('http://localhost:3010/products/8273197');
  sleep(1);
};
