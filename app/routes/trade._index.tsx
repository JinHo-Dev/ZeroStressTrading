import TradeListItem from "~/components/TradeListItem";
import type TradeItem from "~/interfaces/tradeItem";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db.server";
import NavigationBar from "~/components/NavigationBar";
import { useRecoilState } from "recoil";
import { titleState } from "~/atoms/titleState";

export async function loader({ request }: LoaderFunctionArgs) {
  const tradeList = await db.trades.findMany();

  return json({
    tradeList,
  });
}

export default function Trade() {
  const { tradeList } = useLoaderData<typeof loader>();
  const [title, setTitle] = useRecoilState(titleState);
  setTitle("TradeList");

  const isAvailable = tradeList && tradeList.length > 0;

  return (
    <>
      <NavigationBar title="Trade List" backTitle="toMainPage" backUrl=".." />
      <h1>Trade List</h1>
      {isAvailable ? (
        <ul>
          {tradeList.map((item: TradeItem, index: number) => (
            <TradeListItem tradeItem={item} key={item.tradeId} />
          ))}
        </ul>
      ) : (
        <li>No item</li>
      )}
    </>
  );
}