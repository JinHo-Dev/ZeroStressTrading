import { css } from "@emotion/react";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import historyStackState from "~/atoms/historyStackState";
import { db } from "~/db.server";
import BiddingItem from "~/interfaces/biddingItem";
import { authenticator } from "~/services/auth.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
  if (!(await authenticator.isAuthenticated(request))) {
    return redirect("../hello?backto=../myList");
  }

  const biddingList = await db.biddings.findMany({
    where: {
      userId: await authenticator.isAuthenticated(request),
    },
  });

  let user = await authenticator.isAuthenticated(request);

  return json({
    biddingList,
    user,
  });
}

export default function MyList() {
  const { biddingList, user } = useLoaderData<typeof loader>();
  const [historyStack, setHistoryStack] = useRecoilState(historyStackState);
  useEffect(() => {
    setHistoryStack(historyStack + 1);
  }, []);

  const isAvailable = true || (biddingList && biddingList.length > 0);

  return (
    <>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        `}
      >
        <Link
          to="/bye"
          css={css`
            background-color: rgba(0, 0, 20, 0.05);
            flex: 100px 0 0;
            border-radius: 10px;
            padding: 10px;
            margin: 20px;
            display: flex;
            cursor: pointer;
          `}
        >
          <div
            css={css`
              background-color: rgba(0, 0, 20, 0.12);
              flex: 80px 0 0;
              margin-left: 10px;
              border-radius: 100%;
            `}
          ></div>
          <div
            css={css`
              flex: 1;
              margin-left: 10px;
              display: flex;
              flex-direction: column;
            `}
          >
            <span
              css={css`
                flex: 1;
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                font-size: 20px;
                color: rgba(0, 0, 20, 1);
                line-height: 38px;
                font-weight: bold;
              `}
            >
              이름
            </span>
            <span
              css={css`
                flex: 1;
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                font-size: 15px;
                color: rgba(0, 0, 20, 0.8);
                line-height: 8px;
              `}
            >
              {user}
            </span>
            <span
              css={css`
                flex: 1;
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                font-size: 13px;
                color: rgba(0, 0, 20, 0.6);
                line-height: 16px;
              `}
            >
              로그아웃하려면 누르세요
            </span>
          </div>
        </Link>
        <h1>Trade List</h1>
        {isAvailable ? (
          <ul>
            {biddingList.map((item: BiddingItem, index: number) => (
              <li key={index}>
                {item.tradeId}
                {item.biddingPrice}
                {item.biddingDate}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            <li>No item</li>
          </ul>
        )}
      </div>
    </>
  );
}
