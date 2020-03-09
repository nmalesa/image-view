const trace1 = {
  x: ['NoSQL', 'SQL'],
  y: [896, 432],
  name: 'ORM',
  error_y: {
    type: 'data',
    array: [5.52, 4.98],
    visible: true
  },
  type: 'bar'
};

const trace2 = {
  x: ['NoSQL', 'SQL'],
  y: [1794, 3290],
  name: 'Without ORM',
  error_y: {
    type: 'data',
    array: [5.18, 3.36],
    visible: true
  },
  type: 'bar'
};

const data = [trace1, trace2];

const layout = { barmode: 'group' };

Plotly.newPlot('benchmark', data, layout);
