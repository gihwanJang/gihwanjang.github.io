# Algorithm

[문제 바로가기](https://leetcode.com/problems/orderly-queue/description/)

# 문제 설명

## 원본

You are given a string `s` and an integer `k`. You can choose one of the first `k` letters of `s` and append it at the end of the string.

Return _the lexicographically smallest string you could have after applying the mentioned step any number of moves_.

## 번역본

문자열 `s`와  정수 `k`가 주어집니다.
문자열 `s`에서 `k`번째까지 중의 문자 하나를 골라 가장 뒤로 보내는 연산을 할 수 있습니다.

위의 연산 원하는 만큼 수행한 후 얻을 수 있는 사전순으로 가장 작은 문자열을 반환합니다.

# 제한사항

- - `1 <= k <= s.length <= 1000`
- `s` consist of lowercase English letters.

# 입출력 예

**Example 1:**
	**Input:** s = "cba", k = 1
	**Output:** "acb"
	**Explanation:** 
	In the first move, we move the 1st character 'c' to the end, obtaining the string "bac".
	In the second move, we move the 1st character 'b' to the end, obtaining the final result "acb".

**Example 2:**
	**Input:** s = "baaca", k = 3
	**Output:** "aaabc"
	**Explanation:** 
	In the first move, we move the 1st character 'b' to the end, obtaining the string "aacab".
	In the second move, we move the 3rd character 'c' to the end, obtaining the final result "aaabc".

# 풀이

해당 문제는 수학적 지식을 요구하는 문제입니다.

그러므로 우선 `k`가 2보다 크면 주어진 문자열의 모든 경우의 수를 만들수 있다는 것을 알아야 합니다.

그러므로 `k`가 2보다 크면 해당 문자열을 문자기준으로 정렬하여 출력하면 답이됩니다.

`k`가 1인 경우는 모든 경우의 수를 만들수 없으므로 하나씩 뒤로 옮겨가며 모든 문자열을 만들어 본뒤 그중 가장 사전 순으로 빠른 것을 출력해 주시면 됩니다.

```java

class Solution {  
    public String orderlyQueue(String s, int k) {  
        if (k == 1) {  
            return brouteForce(s);  
        }  
  
        char[] string = s.toCharArray();  
        Arrays.sort(string);  
        return String.valueOf(string);  
    }  
  
    private String brouteForce(String s) {  
        String ret = s;  
        StringBuilder sb = new StringBuilder(s);  
  
        for (int i = 0; i < s.length(); ++i) {  
            sb.append(sb.charAt(0));  
            sb.deleteCharAt(0);  
            if (ret.compareTo(sb.toString()) > 0) {  
                ret = sb.toString();  
            }  
        }  
        return ret;  
    }  
}

```