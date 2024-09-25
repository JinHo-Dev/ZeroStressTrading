import { css, keyframes } from "@emotion/react";
import tab_home_high from "/tab_home_high.svg";
import { useRecoilState } from "recoil";
import currentTabState from "~/atoms/currentTabState";
import Tab from "./Tab";

export default function TabBar() {
  return (
    <>
      <div
        css={css`
          flex: 70px 0 0;
          height: 70px;
          background: #fff;
          display: flex;
          flex-direction: row;
          & > div {
            flex: 1;
          }
        `}
      >
        <Tab name="Home" to="/" />
        <Tab name="Trades" to="/trade" />
        <Tab name="Reveal" to="/reveal" />
        <Tab name="Homde" to="/" />
      </div>
    </>
  );
}
