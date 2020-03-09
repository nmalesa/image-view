const nosql = {
  x: ['NoSQL', 'SQL'],
  y: [3, 6],
  name: 'ORM',
  error_y: {
    type: 'data',
    array: [1, 0.5],
    visible: true
  },
  type: 'bar'
};

const sql = {
  x: ['NoSQL', 'SQL'],
  y: [4, 7],
  name: 'Without ORM',
  error_y: {
    type: 'data',
    array: [0.5, 2],
    visible: true
  },
  type: 'bar'
};

const data = [nosql, sql];

const layout = { barmode: 'group' };

console.log('Hello world!');

Plotly.newPlot('benchmark', data, layout);
