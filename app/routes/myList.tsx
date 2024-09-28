import { css } from "@emotion/react";
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
        <div
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
              email@domain.name
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
              내 프로필 편집하기
            </span>
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
