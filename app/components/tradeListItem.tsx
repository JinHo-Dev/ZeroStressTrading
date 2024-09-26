import { css } from "@emotion/react";
import { Link } from "@remix-run/react";
import type TradeItem from "~/interfaces/tradeItem";

export default function TradeListItem({ tradeItem }: { tradeItem: TradeItem }) {
  return (
    <Link rel="prefetch" relative="path" to={tradeItem.tradeId}>
      <li
        css={css`
          height: 100px;
          border-bottom: solid 8px rgba(0, 0, 20, 0.04);
          display: flex;
          overflow: hidden;
          &:hover > div:last-of-type {
            flex: 180px 0 0;
            transition-duration: 0;
          }
          &:hover > div:last-of-type > div {
            background: linear-gradient(
              to right,
              rgba(247, 247, 247, 1) 0%,
              rgba(247, 247, 247, 0) 30%
            );
          }
        `}
      >
        <div
          css={css`
            flex: 1;
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              flex: 1;
              font-size: 18px;
              font-weight: bold;
              line-height: 60px;
            `}
          >
            {tradeItem.tradeName}
          </div>
          <div
            css={css`
              flex: 1;
              font-size: 16px;
              font-weight: normal;
              color: rgba(0, 0, 20, 0.6);
              line-height: 0px;
            `}
          >
            {tradeItem.currentPrice}원
          </div>
        </div>
        <div
          css={css`
            flex: 160px 0 0;
            background-color: #ccc;
            transition-duration: 0.1s;
          `}
        >
          <div
            css={css`
              flex: 92px 0 0;
              background: linear-gradient(
                to right,
                rgba(255, 255, 255, 1) 0%,
                rgba(255, 255, 255, 0) 30%
              );
              width: 100%;
              height: 100%;
              backdrop-filter: blur(4px);
            `}
          ></div>
          <p
            css={css`
              position: relative;
              margin-top: -50px;
              z-index: 1;
              font-size: 13px;
              float: right;
              margin-right: 20px;
              color: #fff;
            `}
          >
            남은시간
          </p>
        </div>
      </li>
    </Link>
  );
}
