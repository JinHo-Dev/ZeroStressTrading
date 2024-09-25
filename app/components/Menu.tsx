import { css, keyframes } from "@emotion/react";
import { Link } from "@remix-run/react";
import React, { ReactNode } from "react";
import close from "/close.svg";
import { useRecoilState } from "recoil";
import menuOpenState from "~/atoms/menuOpenState";

type Props = {
  backUrl?: string;
  children?: ReactNode | undefined;
};

export default function Menu({ backUrl, children }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(menuOpenState);

  const closeMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      setIsMenuOpen(false);
    }
  };

  const blurring_in = keyframes`
    from {
      backdrop-filter: blur(0);
      background-color: rgba(0, 0, 20, 0);
    }

    to {
      backdrop-filter: blur(8px);
      background-color: rgba(0, 0, 20, 0.12);
    }
  `;

  const flying_in = keyframes`
    from {
      transform: translate3d(257px, 0, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  `;

  const blurring_out = keyframes`
    to {
      display: block;
      backdrop-filter: blur(0);
      background-color: rgba(0, 0, 20, 0);
    }

    from {
      display: block;
      backdrop-filter: blur(8px);
      background-color: rgba(0, 0, 20, 0.12);
    }
  `;

  const flying_out = keyframes`
    to {
      display: block;
      transform: translate3d(257px, 0, 0);
    }

    from {
      display: block;
      transform: translate3d(0, 0, 0);
    }
  `;

  return (
    <>
      <div
        onClick={closeMenu}
        css={css`
          display: ${isMenuOpen ? "default" : "none"};
          background-color: rgba(0, 0, 20, 0.12);
          backdrop-filter: blur(8px);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          -webkit-user-drag: none;
          user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          animation: ${isMenuOpen ? blurring_in : blurring_out} 0.15s ease-out;
        `}
      >
        <div
          css={css`
            display: ${isMenuOpen ? "default" : "none"};
            background-color: #fff;
            position: absolute;
            top: 0px;
            right: 0;
            width: 257px;
            height: 100%;
            box-shadow: -8px 0px 24px rgba(0, 0, 20, 0.08);
            animation: ${isMenuOpen ? flying_in : flying_out} 0.15s ease-out;
          `}
        >
          <img
            alt="close Menu"
            onClick={closeMenu}
            src={close}
            css={css`
              padding: 18px;
              cursor: pointer;
              float: right;
            `}
          />
          <ul
            css={css`
              margin-top: 60px;
              font-weight: bold;
              font-size: 16px;
            `}
          >
            <Link to="">
              <li>알림</li>
            </Link>
            <Link to="">
              <li>공지사항</li>
            </Link>
            <Link to="">
              <li>마이페이지</li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
}
