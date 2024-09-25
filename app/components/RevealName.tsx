import { css } from "@emotion/react";
import { Form } from "@remix-run/react";
import { ReactNode, useRef, useState } from "react";

export default function RevealName() {
  const fileSelector = useRef<HTMLInputElement>(null);
  const [tradeName, setTradeName] = useState("");
  const [minPrice, setMinPrice] = useState(0);

  return (
    <Form
      method="post"
      css={css`
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 1;
      `}
    >
      <p
        css={css`
          position: aboslute;
          padding-left: 20px;
          color: rgba(0, 0, 20, 0.6);
          font-size: 15px;
        `}
      >
        게시할 제목을 입력해주세요
      </p>
      <input
        type="text"
        placeholder="제목.."
        value={tradeName}
        onChange={(e) => {
          setTradeName(e.target.value);
        }}
        css={css`
          width: calc(100% - 40px);
          border-radius: 12px;
          height: 50px;
          font-size: 28px;
          margin: 10px 20px 60px 20px;
          padding: 16px;
          background-color: rgba(0, 0, 20, 0.02);
          border: solid 1px rgba(0, 0, 20, 0.08);
          box-shadow:
            inset 0px 2px 4px rgba(0, 0, 20, 0.06),
            inset 0px -2px 4px rgba(255, 255, 255, 0.8);
        `}
      />

      <p
        css={css`
          position: aboslute;
          padding-left: 20px;
          color: rgba(0, 0, 20, 0.6);
          font-size: 15px;
        `}
      >
        제시할 최소금액을 선택해주세요
      </p>
      <input
        type="text"
        placeholder="최소금액.."
        value={minPrice}
        onChange={(e) => {
          setMinPrice(Number(e.target.value.replaceAll(/\D/gi, "")));
        }}
        css={css`
          width: calc(100% - 40px);
          border-radius: 12px;
          height: 50px;
          font-size: 28px;
          margin: 10px 20px 60px 20px;
          padding: 16px;
          background-color: rgba(0, 0, 20, 0.02);
          border: solid 1px rgba(0, 0, 20, 0.08);
          box-shadow:
            inset 0px 2px 4px rgba(0, 0, 20, 0.06),
            inset 0px -2px 4px rgba(255, 255, 255, 0.8);
        `}
      />
      <input type="hidden" name="tradeName" value={tradeName} />
      <input type="hidden" name="minPrice" value={minPrice} />
      <input type="hidden" name="priceUnit" value="KRW" />
      <input type="hidden" value="set Details" />
      <button
        type="submit"
        css={css`
          position: absolute;
          background: #8638ea;
          bottom: 40px;
          left: 20px;
          width: calc(100% - 40px);
          height: 50px;
          border-radius: 10px;
          color: #fff;
          font-weight: bold;
          font-size: 17px;
        `}
      >
        등록하기
      </button>
    </Form>
  );
}
