import { css } from "@emotion/react";
import { ReactNode, useRef } from "react";
import { useRecoilState } from "recoil";
import { useSwiper } from "swiper/react";
import revealStepState from "~/atoms/revealStepState";

type Props = {
  step?: number;
  children?: ReactNode | undefined;
};

export default function RevealPhoto({ step }: Props) {
  const fileSelector = useRef<HTMLInputElement>(null);
  const swiper = useSwiper();
  const [revealStep, setRevealStep] = useRecoilState(revealStepState);

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
          background-color: rgba(0, 0, 20, 0.1);
          border-radius: 10px;
          height: 100%;
          overflow: hidden;
        `}
      >
        <input
          type="button"
          value="사진 추가"
          onClick={() => {
            fileSelector.current?.click();
          }}
          css={css`
            position: absolute;
            margin-left: -60px;
            left: 50%;
            margin-top: -30px;
            top: 50%;
            width: 120px;
            border: none;
            background-color: rgba(255, 255, 255, 0.4);
            height: 60px;
            border-radius: 16px;
            font-size: 15px;
            font-weight: bold;
            cursor: pointer;
          `}
        />
        <input
          type="file"
          onChange={() => {
            setRevealStep((step || 1) + 1);
            swiper.allowSlideNext = true;
            setTimeout(() => {
              swiper.slideNext(500);
              swiper.allowSlideNext = false;
            }, 300);
          }}
          ref={fileSelector}
          css={css`
            display: none;
          `}
        />
      </div>
    </div>
  );
}
