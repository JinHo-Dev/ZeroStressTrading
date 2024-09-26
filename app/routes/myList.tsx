import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import historyStackState from "~/atoms/historyStackState";
import { db } from "~/db.server";
import BiddingItem from "~/interfaces/biddingItem";
import { authenticator } from "~/services/auth.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const biddingList = await db.biddings.findMany({
    where: {
      userId: await authenticator.isAuthenticated(request),
    },
  });

  return json({
    biddingList,
  });
}

export default function MyList() {
  const { biddingList } = useLoaderData<typeof loader>();
  const [historyStack, setHistoryStack] = useRecoilState(historyStackState);
  useEffect(() => {
    setHistoryStack(historyStack + 1);
  }, []);

  const isAvailable = biddingList && biddingList.length > 0;

  return (
    <>
      <h1>Trade List</h1>
      {isAvailable ? (
        <ul>
          {biddingList.map((item: BiddingItem, index: number) => (
            <div>
              {item.tradeId}
              {item.biddingPrice}
              {item.biddingDate}
            </div>
          ))}
        </ul>
      ) : (
        <li>No item</li>
      )}
    </>
  );
}
