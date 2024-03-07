const jsc = require('jsverify');
const dijkstra = require('./code.js');

const graph = {
  A: { B: 1, C: 4 },
  B: { A: 1, C: 2, D: 5 },
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 }
};

const testDistancesNonNegative = (sourceNode) => {
  const distances = dijkstra(graph, sourceNode);
  const allDistancesNonNegative = Object.values(distances).every(
    (distance) => distance >= 0
  );
  return allDistancesNonNegative;
};
