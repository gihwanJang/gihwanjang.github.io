# MST

 `MST(Minimum-Spanning-Tree)`란 최소의 비용으로 모든 노드를 이어주는 트리를 지징합니다.
MST도 Tree의 일종이므로 트리의 특성을 모두 가집니다.

# Prim 알고리즘이란

 시작 정점에서부터 출발하여 신장트리 집합을 단계적으로 확장해나가는 방법입니다.
## Prim 알고리즘의 동작

1. 시작 단계에서는 시작 정점만이 MST(최소 비용 신장 트리) 집합에 포함된다.
2. 집합에 인접한 정점들 중에서 최소 간선으로 연결된 정점을 선택하여 트리를 확장한다.
	- 즉, 가장 낮은 가중치를 먼저 선택한다.
3. 위의 과정을 트리가 (N-1)개의 간선을 가질 때까지 반복한다.

## Prime 구현

```java

import java.util.*;

class Edge implements Comparable<Edge> {
    int node, value;
    
    public Edge(int node, int value) {
        this.node = node;
        this.value = value;
    }
    
    public int compareTo(Edge o) {
        return value - o.value;
    } 
}

class Solution {
    private boolean[] tree;
    private PriorityQueue<Edge> pq;
    
    public void Prim(List<List<Edge>> graph) {
        tree = new boolean[graph.size()];
        pq = new PriorityQueue<>();
        
        addTree(0);
        for (int i = 1; i < graph.size();) {
            Edge curr = pq.poll();
            if (!tree[curr.node]) {
                addTree(curr.node);
                answer += curr.value;
                ++i;
            }
        }
    }
    
    private void addTree(int node) {
        tree[node] = true;
        for (Edge e : graph.get(node)) {
            pq.add(e);
        }
    }
}

```