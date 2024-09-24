import { css } from "@emotion/react";
import { Link } from "@remix-run/react";
import { ReactNode } from "react";

type Props = {
  title: string;
  backUrl?: string;
  children?: ReactNode | undefined;
};

export default function NavigationBar({ title, backUrl, children }: Props) {
  return (
    <>
      <div
        css={css`
          display: flex;
          border-bottom: solid 1px #eee;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          & > * {
            flex: 1;
          }
        `}
      >
        {backUrl ? (
          <Link to={backUrl}>
            <div>Back</div>
          </Link>
        ) : (
          <div></div>
        )}
        <div>{title}</div>
        <div>{children}</div>
      </div>
    </>
  );
}
