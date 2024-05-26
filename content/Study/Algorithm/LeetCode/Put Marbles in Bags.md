# Algorithm

[문제 바로가기](https://leetcode.com/problems/put-marbles-in-bags/description/)

# 문제 설명

## 원본

You have `k` bags. You are given a **0-indexed** integer array `weights` where `weights[i]` is the weight of the `ith` marble. You are also given the integer `k.`

Divide the marbles into the `k` bags according to the following rules:

- No bag is empty.
- If the `ith` marble and `jth` marble are in a bag, then all marbles with an index between the `ith` and `jth` indices should also be in that same bag.
- If a bag consists of all the marbles with an index from `i` to `j` inclusively, then the cost of the bag is `weights[i] + weights[j]`.

The **score** after distributing the marbles is the sum of the costs of all the `k` bags.

Return _the **difference** between the **maximum** and **minimum** scores among marble distributions_.

## 번역본

당신은 k개의 가방을 가지고 있습니다.
시작 **Index**가 0인 정수배열 `weights`가 주어집니다.
`weights[i]`는 `i`번째 구슬의 무게입니다.
또한 가방의 수 `k`가 주어집니다.

아래의 규칙에 따라 구슬을 `k`개의 가방에 나누어 담으려고 합니다.

- 어떤 가방도 비어 있으면 안됩니다.
- 만약 `i`번째 구슬과  `j`번째 구슬이 가방안에 있다면, `i`~`j` 번째 구슬들은 모두 동일한 가방에 있어야 합니다.
- 만약 `i`번째 구슬과  `j`번째 구슬이 가방안에 있다면, 가방의 무게는 `weights[i] + weights[j]`입니다.

구슬을 분배한 후의 점수는 모든 'k' 가방 비용의 합입니다.
분배할 수 있는 모든 경우에 대하여 최대 점수와 최소 점수의 차이를 반환합니다.

# 제한사항

- `1 <= k <= weights.length <= 105`
- `1 <= weights[i] <= 109`

# 입출력 예

**Example 1:**
	**Input:** weights = [1,3,5,1], k = 2
	**Output:** 4
	**Explanation:** 
	The distribution [1],[3,5,1] results in the minimal score of (1+1) + (3+1) = 6. 
	The distribution [1,3],[5,1], results in the maximal score of (1+3) + (5+1) = 10. 
	Thus, we return their difference 10 - 6 = 4.

**Example 2:**
	**Input:** weights = [1, 3], k = 2
	**Output:** 0
	**Explanation:** The only distribution possible is [1],[3]. 
	Since both the maximal and minimal score are the same, we return 0.

# 풀이


```java

class Solution {
	public long putMarbles(int[] weights, int k) {
		long min = 0;
		long max = 0;
		List<Integer> scores = new ArrayList<>(weights.length);
		
		for (int i = 0; i+1 < weights.length; ++i) {
			scores.add(weights[i] + weights[i + 1]);
		}
		scores.sort(null);
		for (int i = 0; i < k-1; ++i) {
			min += scores.get(i);
			max += scores.get(scores.size() - 1 - i);
		}
		return (max - min);
	}
}

```