# 기능 명세서

## 인증 / 인가

### External

#### 로그인
아이디 비밀번호를 입력 받아 유저 정보와 대조
만약 일치한다면 로그인 정보를 갱신하고 토큰을 발급
Refresh 토큰 Redis에 저장

`Exception`
- 아이디 틀림
- 비밀번호 틀림
- 회원 서비스와 통신 장애
- 로그인 정보 DB 연결 장애
#### 로그아웃
Redis의 Refresh 토큰을 삭제하고 로그인 정보를 로그아웃으로 변경

`Exception`
- 로그인 정보 DB 연경 장애
#### 로그인 정보 열람

### Internal

#### 토큰 재발급
Access 토큰 만료 시 Refresh 토큰을 이용하여 토큰을 재 발급
예전의 Redis의 Refresh 토큰을 삭제하고 새 Refresh 토큰을 저장
로그인 정보의 로그인 시간을 갱신

`Exception`
- Refresh 토큰이 만료된 경우
- Refresh 토큰 만 있는 경우
#### 인가