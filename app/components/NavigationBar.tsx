import { css } from "@emotion/react";
import { useNavigate } from "@remix-run/react";
import { ReactNode, useEffect } from "react";
import menu from "/menu.svg";
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
    if (event.target === event.currentTarget) {
      setIsMenuOpen(true);
    }
  };

  return (
    <>
      <div
        css={css`
          flex: 60px 0 0;
          display: flex;
          line-height: 60px;
          font-size: 18px;
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
          <div>
            <img
              src={back}
              onClick={() => {
                setHistoryStack(historyStack - 2);
                navigate(-1);
              }}
              css={css`
                padding: 18px;
                cursor: pointer;
                float: left;
              `}
            />
          </div>
        ) : (
          <div></div>
        )}
        <div>{children}</div>
        <div>
          <img
            alt="open Menu"
            onClick={openMenu}
            src={menu}
            css={css`
              padding: 18px;
              cursor: pointer;
              float: right;
            `}
          />
        </div>
      </div>
    </>
  );
}
