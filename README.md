# 소개

ZeroStressTrading은 중고거래를 하면서 발생하는 스트레스를 줄여줍니다!

```
어떻게?

1. GPT4o를 통해 상품에 대한 예상되는 질문을 미리 생성하여, 상품 판매자의 즉각적인 답변을 필요로 하지 않는다.
2. 경매 형식의 거래를 통해 가격 설정에 대한 귀찮음을 줄여준다.
```

# 요구사항

1. Node 18 이상
2. MySQL 서버

# 설치 및 실행

1. npm i
2. make a ".env" file

```
DATABASE_URL = mysql://id:pw@host:port/db
```

3. npx prisma db push
4. npx prisma generate
5. npm run build
6. npm start

# 사용 라이브러리

- Remix
- Remix Auth / Remix Auth Form
- TailwindCSS
- MySQL
- Prisma / Prisma Client
- Argon2
- Emotion
- Recoil
