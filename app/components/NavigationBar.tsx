import { css } from "@emotion/react";
import { Link, useNavigate } from "@remix-run/react";
import { ReactNode } from "react";
import menu from "/menu.svg";
import back from "/back.svg";
import { useRecoilState } from "recoil";
import menuOpenState from "~/atoms/menuOpenState";
import backButtonState from "~/atoms/backButtonState";

type Props = {
  backUrl?: string;
  children?: ReactNode | undefined;
};

export default function NavigationBar({ children }: Props) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(menuOpenState);
  const [isBackButton, setIsBackButton] = useRecoilState(backButtonState);

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
          & > * {
            flex: 1;
          }
        `}
      >
        {isBackButton ? (
          <div>
            <img
              src={back}
              onClick={() => navigate(-1)}
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
