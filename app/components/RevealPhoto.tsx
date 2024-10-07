import { css } from "@emotion/react";
import { ReactNode, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { useSwiper } from "swiper/react";
import revealImage64State from "~/atoms/revealImage64State";
import revealStepState from "~/atoms/revealStepState";

type Props = {
  step?: number;
  children?: ReactNode | undefined;
};

export default function RevealPhoto({ step }: Props) {
  const fileSelector = useRef<HTMLInputElement>(null);
  const swiper = useSwiper();
  const [revealStep, setRevealStep] = useRecoilState(revealStepState);
  const [revealImage64, setRevealImage64] = useRecoilState(revealImage64State);

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
          background-image: url("${revealImage64[(step || 1) - 1]}");
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          transition-duration: 0.15s;
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
          accept="image/*"
          onChange={(e) => {
            const file = e.currentTarget.files;
            if (file) {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");
              const img = document.createElement("img");
              img.src = URL.createObjectURL(file[0]);
              img.onload = () => {
                const maxPixel = 1024;
                let ratio = 1;
                if (img.width > maxPixel) {
                  ratio = Math.min(ratio, maxPixel / img.width);
                }
                if (img.height > maxPixel) {
                  ratio = Math.min(ratio, maxPixel / img.height);
                }
                canvas.width = Math.floor(img.width * ratio);
                canvas.height = Math.floor(img.height * ratio);
                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                const bs64dt = canvas.toDataURL("image/jpeg", 0.5);
                setRevealImage64((prev) => [...prev, bs64dt]);
              };
            }
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
