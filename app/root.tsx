import { Links, Meta, Outlet, ScrollRestoration } from "@remix-run/react";
import { RecoilRoot } from "recoil";
import "./tailwind.css";

export default function App() {
  return (
    <RecoilRoot>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Outlet />
          <ScrollRestoration />
        </body>
      </html>
    </RecoilRoot>
  );
}
