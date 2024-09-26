import { css } from "@emotion/react";
import { Form } from "@remix-run/react";
import { ReactNode, useRef, useState } from "react";

export default function RevealName() {
  const [isTradeNameFocused, setIsTradeNameFocused] = useState(false);
  const [isMinPriceFocused, setIsMinPriceFocused] = useState(false);

  const tradeNameFocused = () => {
    setIsTradeNameFocused(true);
  };

  const tradeNameBlured = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    setIsTradeNameFocused(false);
  };

  const minPriceFocused = () => {
    setIsMinPriceFocused(true);
  };

  const minPriceBlured = (
    event: React.FocusEvent<HTMLInputElement, Element>,
  ) => {
    setIsMinPriceFocused(false);
  };

  const tradeNameInput = useRef<HTMLInputElement>(null);
  const minPriceInput = useRef<HTMLInputElement>(null);

  const fileSelector = useRef<HTMLInputElement>(null);
  const [tradeName, setTradeName] = useState("");
  const [minPrice, setMinPrice] = useState(0);

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
            <div
              onClick={(e) => {
                e.currentTarget.querySelector("input")?.focus();
              }}
              css={css`
                border: solid 1px rgba(0, 0, 20, 0.1);
                border-radius: ${tradeName.length === 0
                  ? "10px"
                  : "10px 10px 0 0"};
                height: 70px;
                width: calc(100% - 40px);
                margin-left: 20px;
                overflow: hidden;
                transition-duration: 0.15s;
              `}
            >
              <div
                css={
                  isTradeNameFocused || tradeName
                    ? css`
                        position: absolute;
                        font-size: 14px;
                        color: rgba(0, 0, 20, 0.6);
                        margin-left: 12px;
                        margin-top: 6px;
                        line-height: 28px;
                        transition-duration: 0.15s;
                      `
                    : css`
                        position: absolute;
                        font-size: 18px;
                        color: rgba(0, 0, 20, 0.4);
                        margin-left: 12px;
                        margin-top: 0px;
                        line-height: 70px;
                        transition-duration: 0.15s;
                      `
                }
              >
                판매할 상품 이름
              </div>
              <input
                type="text"
                name="tradeName"
                value={tradeName}
                required
                onFocus={tradeNameFocused}
                onBlur={tradeNameBlured}
                onChange={(e) => {
                  setTradeName(e.target.value);
                }}
                ref={tradeNameInput}
                css={css`
                  background: none;
                  border: none;
                  border-radius: 10px 10px 0 0;
                  height: 70px;
                  width: 100%;
                  padding: 14px;
                  padding-top: 30px;
                  font-size: 18px;
                  border-radius: 0;
                  outline: 0;
                `}
              />
            </div>

            <div
              onClick={(e) => {
                e.currentTarget.querySelector("input")?.focus();
              }}
              css={css`
                border: solid ${tradeName.length === 0 ? "0" : "1px"}
                  rgba(0, 0, 20, 0.1);
                border-top: none;
                position: relative;
                border-radius: 0 0 10px 10px;
                width: 100%;
                height: ${tradeName.length === 0 ? "0" : "70px"};
                overflow: hidden;
                width: calc(100% - 40px);
                margin-left: 20px;
                overflow: hidden;
                transition-duration: 0.15s;
              `}
            >
              <div
                css={css`
                  position: absolute;
                  font-size: 14px;
                  color: rgba(0, 0, 20, 0.6);
                  margin-left: 12px;
                  margin-top: 6px;
                  line-height: 28px;
                  transition-duration: 0.15s;
                `}
              >
                희망 최소 가격
              </div>
              <input
                type="text"
                name="minPrice"
                value={minPrice}
                required
                onFocus={minPriceFocused}
                onBlur={minPriceBlured}
                onChange={(e) => {
                  setMinPrice(Number(e.target.value.replaceAll(/\D/gi, "")));
                }}
                ref={minPriceInput}
                css={css`
                  background: none !important;
                  border: none;
                  border-radius: 10px 10px 0 0;
                  height: 70px;
                  width: 100%;
                  padding: 14px;
                  padding-top: 30px;
                  font-size: 18px;
                  border-radius: 0;
                  outline: 0;
                `}
              />
            </div>
            <button
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
