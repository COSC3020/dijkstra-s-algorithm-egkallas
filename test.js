const jsc = require('jsverify');
const fs = require('fs');

eval(fs.readFileSync('code.js')+'');

const graph1 = {
    A: { B: 1, C: 4 },
    B: { A: 1, C: 2, D: 5 },
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
};

const graph2 = {
    A: { B: 3, C: 2 },
    B: { A: 3, C: 1, D: 4 },
    C: { A: 2, B: 1, D: 2 },
    D: { B: 4, C: 2 }
};

const dijkstraCorrectness = jsc.forall(jsc.constant(graph1), jsc.constant(graph2), (graph1, graph2) => {
    const sourceNode = 'A'; 

  
    const distances1 = dijkstra(graph1, sourceNode);
    const distances2 = dijkstra(graph2, sourceNode);
    const expected1 = {A: 0, B: 1, C: 3, D: 4}
    const expected2 = {A: 0, B: 3, C: 2, D: 4}

    
    return verifyDistances(graph1, distances1, expected1) && verifyDistances(graph2, distances2, expected2);
});

function verifyDistances(graph, distances, expected) {

  for (const node in expected) {
      if (distances[node] !== expected[node]) {
          console.log("Incorrect distance for node", node);
          console.log("Expected:", expected[node]);
          console.log("Computed:", distances[node]);
          return false;
      }
  }
  return true;
}

jsc.assert(dijkstraCorrectness);

