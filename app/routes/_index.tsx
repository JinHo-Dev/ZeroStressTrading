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
      </ul>
    </>
  );
}
