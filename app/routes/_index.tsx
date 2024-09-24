import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <h1>ZeroStressTrading</h1>
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
