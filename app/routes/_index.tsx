import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import historyStackState from "~/atoms/historyStackState";

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
  const [historyStack, setHistoryStack] = useRecoilState(historyStackState);
  useEffect(() => {
    setHistoryStack(historyStack + 1);
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
