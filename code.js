const graph = {
    A: { B: 1, C: 4 },      
    B: { A: 1, C: 2, D: 5 },  
    C: { A: 4, B: 2, D: 1 },
    D: { B: 5, C: 1 }
};

function dijkstra(graph, sourceNode)  {
    if(graph.length === 0)

    var distances = {};
    var nodes = Object.keys(graph);
    var visited = new Set(Object.keys(graph));

    for (var node of nodes) {
        distances[node] = Infinity;
    }

    distances[sourceNode] = 0;

    while (visited.size > 0) {
        var min = Infinity;
        var nextNode = null;

        for (var node of nodes) {
            if (visited.has(node) && distances[node] < min) {
                min = distances[node];
                nextNode = node;
            }
        }

        if (nextNode === null) {
            break;
        }

        visited.delete(nextNode);

        var neighbors = Object.keys(graph[nextNode]);

        for (var neighbor of neighbors) {
            var newDistance = distances[nextNode] + graph[nextNode][neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
            }
        }
    }

    return distances;
}
