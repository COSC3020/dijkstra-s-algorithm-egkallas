const jsc = require('jsverify');
const dijkstra = require('./code.js');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomGraph() {
  const nodes = ['A', 'B', 'C', 'D']; 
  const graph = {};
  for (let node of nodes) {
      graph[node] = {};
      for (let neighbor of nodes) {
          if (neighbor !== node) {
              graph[node][neighbor] = getRandomInt(1, 10); 
          }
      }
  }
  return graph;
}

const sourceNodeGen = jsc.suchthat(jsc.elements(['A', 'B', 'C', 'D']), node => node);


const nonNegativePaths = jsc.forall(sourceNodeGen, sourceNode => {
  const graph = generateRandomGraph();
  const distances = dijkstra(graph, sourceNode);
  if (!distances) return true; 
  for (const node in distances) {
      if (distances[node] < 0) {
          console.log("Negative distance found:", distances[node]);
          return false;
      }
  }
  return true;
});

jsc.assert(nonNegativePaths);

