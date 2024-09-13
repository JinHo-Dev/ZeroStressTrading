import { Link } from "@remix-run/react";

export default function Trade() {
  return (
    <>
      Trade List
      {["1", "2", "3"].map((data, index) => (
        <>
          <br />
          <Link rel="prefetch" relative="path" to={data}>
            {data}
          </Link>
        </>
      ))}
    </>
  );
}
