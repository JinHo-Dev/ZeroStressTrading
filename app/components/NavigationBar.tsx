import { Link } from "@remix-run/react";
import { ReactNode } from "react";

type Props = {
  title: string;
  backTitle?: string;
  backUrl?: string;
  children?: ReactNode | undefined;
};

export default function NavigationBar({
  title,
  backTitle,
  backUrl,
  children,
}: Props) {
  return (
    <>
      <div className="NavigationBar">
        {backTitle && backUrl ? (
          <Link to={backUrl}>
            <div>{backTitle}</div>
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
