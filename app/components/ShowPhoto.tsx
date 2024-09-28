import { css } from "@emotion/react";
import { useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

export default function ShowPhoto() {
  const swiper = useSwiper();

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #fff;
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
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center;
          transition-duration: 0.15s;
        `}
      ></div>
    </div>
  );
}
