import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { RecoilRoot } from "recoil";
import "./tailwind.css";
import { css } from "@emotion/react";
import NavigationBar from "./components/NavigationBar";
import Menu from "./components/Menu";
import TabBar from "./components/TabBar";

export default function App() {
  return (
    <RecoilRoot>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <Scripts />
        </head>
        <body
          css={css`
            background-color: rgba(0, 0, 20, 0.04);
          `}
        >
          <div
            css={css`
              background-color: #fff;
              height: 100vh;
              position: fixed;
              width: 100vw;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              @media (min-width: 500px) {
                left: 50%;
                top: 20px;
                width: 400px;
                margin-left: -200px;
                height: calc(100vh - 40px);
                border: solid 1px rgba(0, 0, 20, 0.12);
                border-radius: 12px;
                box-shadow: 0px 8px 60px rgba(0, 0, 20, 0.08);
              }
            `}
          >
            <NavigationBar />
            <div
              css={css`
                overflow: auto;
                height: 100%;
                flex: 1;
              `}
            >
              <Outlet />
              <ScrollRestoration />
            </div>
            <TabBar />
            <Menu />
          </div>
        </body>
      </html>
    </RecoilRoot>
  );
}
