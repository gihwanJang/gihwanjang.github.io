## 1. Outline
 Segment Tree란 계산이 가능한 개별 Node의 정보를 계산하여  상위 Node에 저장하는 형태로 나타내는 Tree의 자료구조이다.
이때 보통 인접하는 노드의 정보를 계산하여 상위의 Node에 저장하게 되고 그러므로 이진트리의 형태를 보이게 된다.
해당 자료구조는 보통 실재 이진트리의 형태 보다 배열의 형태로 저장을 한다.

<장점> 
구간합에 대하여 O(log(n))의 시간 복잡도로 구간합을 구할 수 있다.
물론 누적합을 이용한 구간합의 경우 O(1)의 시간복잡도로 값을 산출 할 수 있지만 만약 배열의 값을 수정 해야한다면 수정 할때마다 O(n)의 시간 복잡도를 소요하게 된다.
해당 자료구조를 사용하게되면 값에 대한 수정을 O(log(n))에 할 수 있게되므로 좀더 효율적이라고 볼 수 있다.

<단점>
공간을 복잡도가 증가한다.
누적합을 이용할 경우 O(n)에 가능하지만 해당 자료구조를 사용하게되면 그보다 많은 공간을 사용하게된다.
트리의 높이를 구하여 실재 사용하는 공간만을 지정하기도 하지만 보통 O(4n)의 공간 복잡도를 이용한다.

## 2. Build
 우선 1차원 배열의 누적합에 대하여 생각해 보자.
해당 배열을 받았을 경우 해당 배열을 이용하여 트리를 만들어야한다.
이때, 인접한 노드 마다 계산한 정보들을 부모의 값으로 유지하면 되기 때문에 반으로 나누어 계산한 값들을 해당 노드에 값을 넣어준다.
이때  해당 노드의 인덱스를 idx라고 하였을 때 인접한 자식 노드들의 인덱스는 2*idx 와 그 옆의 2*idx + 1이 된다.
```java
private int buildTree(int start, int end, int node) {
	if (start == end) {
		return tree[node] = origin[start];
	}
	
	int mid = (start + end) / 2;
	int left = buildTree(start, mid, node * 2);
	int right = buildTree(mid + 1, end, node * 2 + 1);
	return (tree[node] = left + right);
}
```

## 3. Update
이제 해당 자료구조의 장점중 하나인 업데이트를 구현하여야 한다.
업데이트는 해당 인덱스를 포함하고 있는 노드들을 모두 업데이트해 주어야한다.
그러므로 Root 노드에서 부터 시작하여 반 씩 나누어 내려가며 말단 노드까지 해당 노드가 포함된 구간을 모두 업데이트한다.
구간을 벗어나면 해당 구간 부터는 진행하지 않는다.
이때, 해당 구간을 판단 할 때는 다음과 같은 조건식을 사용하면 된다.
(구간 시작 > 인덱스 OR 구간 끝 < 인덱스)

```java
private void update(int start, int end, int node, int target, int diff) {
	if (start > target || target > end) { // 구간을 벗어난 경우
		return;
	}
	tree[node] += diff;
	if (start == end ) { // 말단 노드인 경우
		return;
	}

	int mid = (start + end) / 2;
	update(start, mid, node * 2, target, diff);
	update(mid + 1, end, node * 2 + 1, target, diff);
}
```

## 4. GetSection
마지막으로 구간에 대한 계산한 값을 가져오는 것을 구현하여야 한다.
해당 방식 또한 업데이트를 하는 과정과 비슷하다 다만 업데이트는 한 인덱스에 대하여 이루어 졌다면 해당 함수는 구간을 포함하는 노드에 대하여 모두 연산을 해 주어야 한다는 것이다.
그러므로 Root 노드에서 부터 시작하여 반 씩 나누어 내려가며 해당 구간이 포함된 노드를 모두 가져와 연산한 값을 반환해 준다.
구간을 벗어나면 진행 하지 않으며 구간에 해당 하면 더이상 내려가지 않는다.
이때, 벗어나는 구간을 판단 할 때는 다음과 같은 조건 식을 사용하면 된다.
(노드의 끝 < 구간의 시작 OR 구간의 끝 < 노드의 시작)
포함하는 구간을 판단 할 때는 다음과 같은 조건 식을 사용하면 된다.
(노드의 끝 <= 구간의 끝 AND 구간의 시작 >= 노드의 시작)
```java
private int getSection(int start, int end, int low, int hight, int node) {
	if (hight < start || end < low) { // 벗어나는 구간
		return 0;
	} else if (low >= start && hight <= end) { // 포함하는 구간
		return tree[node];
	}
	
	int mid = (low + hight) / 2;
	int left = getSum(start, end, low, mid, node * 2);
	int right = getSum(start, end, mid + 1, hight, node * 2 + 1);
	return (left + right);
}
```

## 5. SegmentTreeClass
```java
class SegmentTree {
	private int size;
	private long[] tree;
	private long[] origin;

	public SegmentTree(long[] origin) { // 배열은 1번 인덱스 부터 시작한다고 가정
		this.size = origin.length-1;
		this.tree = new long[4 * size];
		this.origin = origin; // 해당 원 배열은 따로 저장하지 않아도 무방
		buildTree(1, size, 1);
	}

	public void update(int target, int value) {
		// 만약 원 배열을 저장하지 않았다면 아래와 같이 사용하여도 괜찬음
		// long diff = value - getSum(target, target);
		update(1, size, 1, target, value - origin[target]);
		origin[target] = value;
	}

  

	public long getSum(int start, int end) {
		return getSum(start, end, 1, size, 1);
	}

	private void update(int start, int end, int node, int target, long diff) {
		if (start > target || target > end) {
			return;
		}
		tree[node] += diff;
		if (start == end ) {
			return;
		}
		
		int mid = (start + end) / 2;
		update(start, mid, node * 2, target, diff);
		update(mid + 1, end, node * 2 + 1, target, diff);
	}

  

	private long getSum(int start, int end, int low, int hight, int node) {
		if (hight < start || end < low) {
			return 0;
		} else if (low >= start && hight <= end) {
			return tree[node];
		}
		
		int mid = (low + hight) / 2;
		long left = getSum(start, end, low, mid, node * 2);
		long right = getSum(start, end, mid + 1, hight, node * 2 + 1);
		return (left + right);
	}

  

	private long buildTree(int start, int end, int node) {
		if (start == end) {
			return tree[node] = origin[start];
		}
		
		int mid = (start + end) / 2;
		long left = buildTree(start, mid, node * 2);
		long right = buildTree(mid + 1, end, node * 2 + 1);
		return (tree[node] = left + right);
	}
}
```
