import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import backButtonState from "~/atoms/backButtonState";
import Menu from "~/components/Menu";
import NavigationBar from "~/components/NavigationBar";

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
        <Link to={`/trade`}>
          <li>View Trade List</li>
        </Link>
        <Link to={`/reveal`}>
          <li>Create a New Trade</li>
        </Link>
        <Link to={`/`}>
          <li>I made this Trades</li>
        </Link>
        <Link to={`/myBid`}>
          <li>I bid this Trades</li>
        </Link>
        <Link to={`/`}>
          <li>Completed Trades</li>
        </Link>
        <Link to={`/`}>
          <li>Edit My Profile</li>
        </Link>
      </ul>
    </>
  );
}
