import { css } from "@emotion/react";
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
          -webkit-user-drag: none;
          user-select: none;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          & > div {
            flex: 1;
          }
        `}
      >
        <Tab name="Home" to="/" />
        <Tab name="Buy" to="/trade" />
        <Tab name="Sell" to="/reveal" />
        <Tab name="MyList" to="/myList" />
      </div>
    </>
  );
}
