import { LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import NavigationBar from "~/components/NavigationBar";
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
        <NavigationBar
          title="Create Trade"
          backTitle="toMainPage"
          backUrl=".."
        />
        <h1>No Item Available</h1>
      </>
    );
  }

  return (
    <>
      <NavigationBar
        title={tradeItem.tradeName || "-"}
        backTitle="toTradeList"
        backUrl=".."
      />
      <h1>{tradeItem.tradeName}</h1>
      <ul>
        <li>
          <div>tradeId: {tradeItem.tradeId}</div>
        </li>
        <li>
          <div>itemId: {tradeItem.itemId}</div>
        </li>
        <li>
          <div>sellerId: {tradeItem.sellerId}</div>
        </li>
        <li>
          <div>createDate: {tradeItem.createDate}</div>
        </li>
        <li>
          <div>currentPrice: {tradeItem.currentPrice}</div>
        </li>
      </ul>
    </>
  );
}
