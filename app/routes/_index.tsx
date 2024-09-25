import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import backButtonState from "~/atoms/backButtonState";

export const meta: MetaFunction = () => {
  return [
    { title: "ZST" },
    {
      name: "description",
      content: "Stress-free Trading with ZeroStressTrading",
    },
  ];
};

export default function Index() {
  const [isBackButton, setIsBackButton] = useRecoilState(backButtonState);

  useEffect(() => {
    setIsBackButton(false);
  }, []);

  return (
    <>
      <h1>ZST</h1>
      <ul>
        <Link to={`/`}>
          <li>Event</li>
        </Link>
      </ul>
    </>
  );
}
