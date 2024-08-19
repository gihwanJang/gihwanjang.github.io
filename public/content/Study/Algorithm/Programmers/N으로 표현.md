# 문제 설명

아래와 같이 5와 사칙연산만으로 12를 표현할 수 있습니다.

12 = 5 + 5 + (5 / 5) + (5 / 5)  
12 = 55 / 5 + 5 / 5  
12 = (55 + 5) / 5

5를 사용한 횟수는 각각 6,5,4 입니다. 그리고 이중 가장 작은 경우는 4입니다.  
이처럼 숫자 N과 number가 주어질 때, N과 사칙연산만 사용해서 표현 할 수 있는 방법 중 N 사용횟수의 최솟값을 return 하도록 solution 함수를 작성하세요.

# 제한사항

- N은 1 이상 9 이하입니다.
- number는 1 이상 32,000 이하입니다.
- 수식에는 괄호와 사칙연산만 가능하며 나누기 연산에서 나머지는 무시합니다.
- 최솟값이 8보다 크면 -1을 return 합니다.

# 입출력 예

|N|number|return|
|---|---|---|
|5|12|4|
|2|11|3|

# 입출력 예 설명

## 예제 #1  
문제에 나온 예와 같습니다.

## 예제 #2  
`11 = 22 / 2`와 같이 2를 3번만 사용하여 표현할 수 있습니다.

# 풀이

 해당 문제는 DP분류에 해당 하므로 DP를 이용하여 해결할 수 있습니다.

접근 방법을 떠올리기가 힘들어 많은 힌트들을 찾아봤지만 여전히 이해하기가 난해했습니다.
그러다 문뜩 다음과 같은 아이디어가 떠올랐습니다.

- N = 1 -> 1  
- N = 2 -> 1+1
- N = 3 -> 1+2, 2+1
- N = 4 -> 1+3, 2+2, 3+1
- N = 5 -> 1+4, 2+3, 3+2, 4+1
- N = 6 -> 1+5, 2+4, 3+3, 4+2, 5+1
- N = 7 -> 1+6, 2+5, 3+4, 4+3, 5+2, 6+1
- N = 8 -> 1+7, 2+6, 3+5, 4+4, 5+3, 6+2, 7+1

위는 N을 만들 수 있는 조합을 나타낸 것입니다.  
이때 해당 N을 만들 때 사용되는 것은 모두 N보다 작은 값입니다.  
조합의 합이 되는 것을 각각 N으로 생각하고 괄호로 묶는다면 모든 사칙연산의 모든 경우의 수를 계산할 수 있다는 것을 알 수 있습니다.

이때 각각의 N에 대하여 서로 사칙연산을 수행해주면 됩니다.
그럼 모든 경우를 찾을 수 있고 이때 나누기 연산에서 0으로 나누는지만 주의해 주면 문제를 해결 할 수 있습니다.

```java
import java.util.*;

class Solution {
    private int number;
    
    public int solution(int N, int number) {
        if (number == N) {
            return 1;
        }
        this.number = number;
        List<List<Integer>> dp = new ArrayList<>(8);
        dp.add(new ArrayList<>());
        dp.get(0).add(N);
        
        for (int i = 1; i < 8; ++i) {
            dp.add(new ArrayList<>());
            dp.get(i).add(dp.get(i - 1).get(0) * 10 + N);
            if (dp.get(i).get(0) == number) {
                return (i + 1);
            }
                
            for (int j = 0; j < i; ++j) {
                for (int a : dp.get(j)) {
                    for (int b : dp.get(i - j - 1)) {
                        if (makeTable(dp.get(i), a, b)) {
                            return (i + 1);
                        }
                    }
                }
            }
        }
        return -1;
    }
    
    private boolean makeTable(List<Integer> table, int a, int b) {
        table.add(a + b);
        table.add(a - b);
        table.add(a * b);
        if (b != 0) {
            table.add(a / b);
        }
        for (int i = 1;  i <= 4; ++i) {
            if (number == table.get(table.size() - i)) {
                return true;
            }
        }
        return false;
    }
}
```