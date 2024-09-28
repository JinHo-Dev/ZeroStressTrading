import { css } from "@emotion/react";
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
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      <h1>{tradeItem.tradeName}</h1>
      <ul>
        <li>
          <div>남은 시간: 11111111</div>
        </li>
        <li>
          <div>현 가격: {tradeItem.currentPrice}원</div>
        </li>
      </ul>
      <h2>입찰기록</h2>
      <ul>
        <li>
          <div>123123213</div>
        </li>
        <li>
          <div>214123213</div>
        </li>
      </ul>
      {tradeItem.sellerId !== user ? (
        <div
          css={css`
            border-radius: 20px 20px 0 0;
            overflow: hidden;
            box-shadow: 0 -4px 12px rgba(0, 0, 20, 0.12);
            position: absolute;
            width: 100%;
            height: fit-content;
            background-color: #fff;
            bottom: 0;
          `}
        >
          <Form method="post">
            <input type="hidden" name="tradeId" value={tradeItem.tradeId} />
            <div
              onClick={(e) => {
                e.currentTarget.querySelector("input")?.focus();
              }}
              css={css`
                border: solid 1px rgba(0, 0, 20, 0.1);
                position: relative;
                border-radius: 10px;
                width: 100%;
                height: "70px";
                overflow: hidden;
                width: calc(100% - 40px);
                margin-left: 20px;
                margin-top: 20px;
                overflow: hidden;
                transition-duration: 0.15s;
              `}
            >
              <div
                css={css`
                  position: absolute;
                  font-size: 14px;
                  color: rgba(0, 0, 20, 0.6);
                  margin-left: 12px;
                  margin-top: 6px;
                  line-height: 28px;
                  transition-duration: 0.15s;
                `}
              >
                입찰할 금액
              </div>
              <input
                type="number"
                name="biddingPrice"
                required
                css={css`
                  background: none !important;
                  border: none;
                  border-radius: 10px 10px 0 0;
                  height: 70px;
                  width: 100%;
                  padding: 14px;
                  padding-top: 30px;
                  font-size: 18px;
                  border-radius: 0;
                  outline: 0;
                `}
              />
            </div>
            <button
              css={css`
                background: #8638ea;
                bottom: 10px;
                margin: 20px;
                width: calc(100% - 40px);
                height: 60px;
                border-radius: 10px;
                color: #fff;
                font-weight: bold;
                font-size: 17px;
              `}
            >
              입찰하기
            </button>
          </Form>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
