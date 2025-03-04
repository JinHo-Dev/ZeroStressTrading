import { css } from "@emotion/react";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import historyStackState from "~/atoms/historyStackState";
import NavigationBar from "~/components/NavigationBar";
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
          height: 84px;
          background-color: #e5e5ed;
        `}
      >
        <NavigationBar>My List</NavigationBar>
      </div>
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          background-color: #e5e5ed;
        `}
      >
        <div
          css={css`
            background-color: #fff;
            flex: 160px 0 0;
            border-radius: 14px;
            padding: 22px 22px 11px 22px;
            margin: 0 22px;
            display: flex;
            flex-direction: column;
          `}
        >
          <div
            css={css`
              flex: 70px 0 0;
              display: flex;
            `}
          >
            <div
              css={css`
                background-color: rgba(0, 0, 20, 0.12);
                flex: 70px 0 0;
                margin-left: 0px;
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
                  font-size: 21px;
                  color: #000010;
                  line-height: 42px;
                  font-weight: bold;
                `}
              >
                User 999
              </span>
              <span
                css={css`
                  flex: 1;
                  margin-left: 10px;
                  display: flex;
                  flex-direction: column;
                  font-size: 16px;
                  color: #78787d;
                  line-height: 8px;
                `}
              >
                {user}
              </span>
            </div>
          </div>
          <div
            css={css`
              flex: 1;
              display: flex;
              justify-content: space-between;
              padding-top: 15px;
            `}
          >
            <div
              css={css`
                flex: 30% 0 0;
                background: #e5e5ed;
                border-radius: 14px;
                cursor: pointer;
              `}
            ></div>
            <div
              css={css`
                flex: 30% 0 0;
                background: #e5e5ed;
                border-radius: 14px;
                cursor: pointer;
              `}
            ></div>
            <div
              css={css`
                flex: 30% 0 0;
                background: #e5e5ed;
                border-radius: 14px;
                cursor: pointer;
              `}
            ></div>
          </div>
        </div>
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
