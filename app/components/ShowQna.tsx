import { css } from "@emotion/react";
import { useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

export default function ShowQna({
  question,
  answer,
}: {
  question?: string;
  answer?: string;
}) {
  const swiper = useSwiper();

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
        z-index: 1;
      `}
    >
      <div
        css={css`
          position: relative;
          width: calc(100% - 40px);
          margin: 0 20px;
          background-color: rgba(0, 0, 20, 0.04);
          border-radius: 10px;
          height: 100%;
          overflow: hidden;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          transition-duration: 0.15s;
          padding: 20px;
        `}
      >
        <div
          css={css`
            position: relative;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            justify-content: center;
            & > div > div {
              width: fit-content;
              max-width: 70%;
              height: fit-content;
              padding: 10px;
              border-radius: 16px;
              font-size: 15px;
              margin-bottom: 20px;
              color: #212121;
              font-weight: bold;
            }
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row-reverse;
            `}
          >
            <div
              css={css`
                background: #efe3ff;
                text-align: right;
              `}
            >
              <span>{question}</span>
            </div>
          </div>
          <div
            css={css`
              display: flex;
              flex-direction: row;
            `}
          >
            <div
              css={css`
                background: #fff;
                text-align: left;
              `}
            >
              {answer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
