import { css } from "@emotion/react";
import { Form } from "@remix-run/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import LabeledInput from "./LabeledInput";
import revealImage64State from "~/atoms/revealImage64State";
import { useRecoilState } from "recoil";

export default function RevealName() {
  const [tradeName, setTradeName] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [revealImage64, setRevealImage64] = useRecoilState(revealImage64State);

  return (
    <>
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 1;
        `}
      >
        <div
          css={css`
            position: absolute;
            width: 100%;
            height: fix-content;
            bottom: 20px;
          `}
        >
          <Form method="post">
            <LabeledInput
              type="text"
              name="tradeName"
              autoComplete="no"
              placeholder="판매 상품 이름"
              onChange={(e) => {
                setTradeName(e.currentTarget.value);
              }}
              state={tradeName.length === 0 ? undefined : -1}
            />
            <LabeledInput
              type="text"
              name="minPrice"
              autoComplete="no"
              placeholder="최소 희망 가격"
              value={minPrice}
              onChange={(e) => {
                setMinPrice(
                  Number(e.currentTarget.value.replaceAll(/\D/gi, "")),
                );
              }}
              state={tradeName.length === 0 ? 0 : 1}
            />
            <input type="hidden" name="image64_1" value={revealImage64[0]} />
            <button
              type="submit"
              css={css`
                background: #8638ea;
                bottom: 10px;
                margin: 20px;
                width: calc(100% - 40px);
                height: 60px;
                border-radius: 10px;
                color: #fff;
                font-weight: bold;
                font-size: 17px;
              `}
            >
              상품 등록
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
