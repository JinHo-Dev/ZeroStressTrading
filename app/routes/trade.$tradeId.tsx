import { Prisma } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import historyStackState from "~/atoms/historyStackState";
import { db } from "~/db.server";
import { authenticator } from "~/services/auth.server";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const tradeItem = await db.trades.findUnique({
    where: {
      tradeId: params.tradeId,
    },
  });

  let user = await authenticator.isAuthenticated(request);

  return json({
    tradeItem,
    user,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  let data: Prisma.biddingsCreateInput;

  if (request.method === "POST") {
    data = {
      biddingPrice: Number(body.get("biddingPrice") as string),
      tradeId: body.get("tradeName") as string,
      biddingDate: new Date(),
    };

    await db.biddings.create({
      data: data,
    });

    return redirect(".");
  }
}

export default function Trade() {
  const { tradeItem, user } = useLoaderData<typeof loader>();

  const [historyStack, setHistoryStack] = useRecoilState(historyStackState);
  useEffect(() => {
    setHistoryStack(historyStack + 1);
  }, []);

  const isAvailable = tradeItem && tradeItem.tradeId;

  if (!isAvailable) {
    return (
      <>
        <h1>No Item Available</h1>
      </>
    );
  }

  return (
    <>
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
      {tradeItem.sellerId !== user ? (
        <Form method="post">
          <input type="hidden" name="tradeId" value={tradeItem.tradeId} />
          <input type="number" name="biddingPrice" required />
          {tradeItem.priceUnit}
          <button>Bid</button>
        </Form>
      ) : (
        <></>
      )}
    </>
  );
}
