const trace1 = {
  x: ['MongoDB', 'MariaDB'],
  y: [123.6, 34.01],
  name: 'Without Caching',
  error_y: {
    type: 'data',
    array: [8.31, 6.13],
    visible: true,
  },
  type: 'bar'
};

const trace2 = {
  x: ['MongoDB', 'MariaDB'],
  y: [21.44, 13.98],
  name: 'Memcached',
  error_y: {
    type: 'data',
    array: [3.14, 2.59],
    visible: 'true'
  },
  type: 'bar'
};

const trace3 = {
  x: ['MongoDB', 'MariaDB'],
  y: [38.71, 18.31],
  name: 'Redis',
  error_y: {
    type: 'data',
    array: [5.00, 2.17],
    visible: true
  },
  type: 'bar'
};

const data = [trace1, trace2, trace3];

const layout = { barmode: 'group' };

Plotly.newPlot('stress', data, layout);
