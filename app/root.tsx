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
          <title>Re:store</title>
          <Meta />
          <Links />
          <Scripts />
        </head>
        <body>
          <div
            css={css`
              background-color: #fff;
              height: 100vh;
              position: absolute;
              width: 100vw;
              overflow: hidden;
              display: flex;
              flex-direction: column;
            `}
          >
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
