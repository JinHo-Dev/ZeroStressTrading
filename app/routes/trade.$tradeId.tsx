import { LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";

export async function loader({ params }: LoaderFunctionArgs) {
  const tradeItem = await db.trades.findUnique({
    where: {
      tradeId: params.tradeId,
    },
  });

  return json({
    tradeItem,
  });
}

export default function Trade() {
  const { tradeItem } = useLoaderData<typeof loader>();
  const isAvailable = tradeItem && tradeItem.tradeId;

  if (!isAvailable) {
    return (
      <>
        <Link to="../trade" className="backBtn">
          Return to List
        </Link>
        <h1>No Item Available</h1>
      </>
    );
  }

  return (
    <>
      <Link to="../trade" className="backBtn">
        Return to List
      </Link>
      <h1>{tradeItem.tradeName}</h1>
      <div>tradeId: {tradeItem.tradeId}</div>
      <div>itemId: {tradeItem.itemId}</div>
      <div>sellerId: {tradeItem.sellerId}</div>
      <div>createDate: {tradeItem.createDate}</div>
      <div>currentPrice: {tradeItem.currentPrice}</div>
    </>
  );
}
