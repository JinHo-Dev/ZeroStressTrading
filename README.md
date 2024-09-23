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
2. npm update
3. setup mysql server

```
TABLE: trades (utf8mb4 - utf8mb4_general_ci) {
    trade_id: varchar(45) unique,
    trade_name: varchar(45),
    create_date: timestamp(0),
    update_date: timestamp(0),
    complete_date: timestamp(0),
    is_complete: tinyint(1),
    is_cancel: tinyint(1),
    seller_id: varchar(45),
    buyer_id: varchar(45),
    item_id: varchar(45),
    detail: json,
    min_price: number,
    max_price: number,
    current_price: number,
    price_unit: varchar(45)
}
```

4. make a ".env" file like this;

```
DATABASE_URL = mysql://id:pw@host:port/db
```

5. npm run setup
6. npm start

# 사용 프레임워크/라이브러리

- Remix
- TailwindCSS
- MySQL
- Prisma

# Known Issue

- 한글 이름으로 등록 시, TypeError 발생
