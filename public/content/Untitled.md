
`Propagation`
영속성 전파 과연 옳은 것인가 JPA에서 cascade를 활용하면 연관된 데이터 모두 같이하여 추가할 수 있다 다만 각자 서비스는 각자 맡은 역할이 있고이에 대하여 다른 서비스의 도메인까지 건들이는 것은 좋은 설계는 아닐 것 같다.

`Phantom Read`
한개의 Transaction 에서 같은 조건으로 2번 읽었는데 2 번의의 결과가 다른 현상. 없던 데이터가 생기는 현상
MYSql 격리 레벨이 Read Commit이라 발생 (Read Uncommit, Read Commit, Repeatable Read, Serializable), Review 쪽은 Unique Key를 추가하므로서 해당 문제 해결


