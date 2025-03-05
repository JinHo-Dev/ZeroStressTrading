import { css } from "@emotion/react";
import { useNavigate } from "@remix-run/react";
import { ReactNode, useEffect } from "react";
import menu from "/menu.svg";
import bell from "/bell.svg";
import search from "/search.svg";
import back from "/back.svg";
import { useRecoilState } from "recoil";
import menuOpenState from "~/atoms/menuOpenState";
import historyStackState from "~/atoms/historyStackState";

type Props = {
  backUrl?: string;
  children?: ReactNode | undefined;
};

export default function NavigationBar({ children }: Props) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(menuOpenState);

  const [historyStack, setHistoryStack] = useRecoilState(historyStackState);
  useEffect(() => {
    setHistoryStack(historyStack + 1);
  }, []);

  const openMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setIsMenuOpen(true);
  };

  return (
    <>
      <div
        css={css`
          padding: 0 11px;
          background-color: rgba(255, 255, 255, 0);
          backdrop-filter: blur(32px);
          width: 100%;
          height: 84px;
          z-index: 2;
          position: fixed;
          display: flex;
          flex: 84px 0 0;
          -webkit-user-drag: none;
          user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          & > * {
            flex: 1;
          }
        `}
      >
        {historyStack > 1 ? (
          <div
            css={css`
              flex: 48px 0 0;
            `}
          >
            <img
              src={back}
              onClick={() => {
                setHistoryStack(historyStack - 2);
                navigate(-1);
              }}
              css={css`
                padding: 0 0 0 18px;
                cursor: pointer;
                float: left;
                height: 100%;
              `}
            />
          </div>
        ) : (
          <></>
        )}
        <div
          css={css`
            line-height: 84px;
            font-size: 39px;
            font-weight: bold;
            margin-left: 11px;
            color: #110c18;
          `}
        >
          {children}
        </div>
        <div
          css={css`
            padding: 21px 11px;
            flex: 64px 0 0;
            display: flex;
            cursor: pointer;
          `}
          onClick={openMenu}
        >
          <div
            css={css`
              flex: 1;
              border-radius: 14px;
              background-color: #fff;
              background-image: url(${search});
              background-repeat: no-repeat;
              background-position: 48% 48%;
              background-size: 22px 22px;
              border: solid 1px #e5e5ed;
            `}
          ></div>
        </div>

        <div
          css={css`
            padding: 21px 11px;
            flex: 0 0 64px;
            display: flex;
            cursor: pointer;
          `}
          onClick={openMenu}
        >
          <div
            css={css`
              flex: 1;
              border-radius: 14px;
              background-color: #fff;
              background-image: url(${bell});
              background-repeat: no-repeat;
              background-position: 54% 48%;
              background-size: 22px 22px;
              border: solid 1px #e5e5ed;
            `}
          ></div>
        </div>
      </div>
    </>
  );
}
