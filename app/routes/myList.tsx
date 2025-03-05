import { css } from "@emotion/react";
import { json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import currentTabState from "~/atoms/currentTabState";
import historyStackState from "~/atoms/historyStackState";
import NavigationBar from "~/components/NavigationBar";
import { db } from "~/db.server";
import BiddingItem from "~/interfaces/biddingItem";
import { authenticator } from "~/services/auth.server";
import menu from "/menu.svg";
import setting from "/setting.svg";
import logout from "/logout.svg";

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
  const [currentTab, setCurrentTab] = useRecoilState(currentTabState);

  useEffect(() => {
    setHistoryStack(historyStack + 1);
    setCurrentTab("MyList");
  }, []);

  const isAvailable = biddingList && biddingList.length > 0;

  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        background-color: #e5e5ed;
        overflow-y: auto;
      `}
    >
      <div
        css={css`
          height: 84px;
        `}
      >
        <NavigationBar>
          My
          <span
            css={css`
              color: #7c3de1;
              margin: 0 2px;
              font-weight: 800;
            `}
          >
            :
          </span>
          List
        </NavigationBar>
      </div>
      <div
        css={css`
          width: 100%;
        `}
      >
        <div
          css={css`
            background-color: #fff;
            height: 160px;
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
                background-color: #c7c7ce;
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
              justify-content: space-around;
              padding-top: 15px;
            `}
          >
            <div
              css={css`
                flex: 110px 0 0;
                background: #e5e5ed;
                border-radius: 14px;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 18px;
              `}
            >
              <div
                css={css`
                  height: 100%;
                  flex: 36px 0 0;
                  margin-left: 4px;
                  background-image: url(${menu});
                  background-repeat: no-repeat;
                  background-position: center center;
                  background-size: 17px 17px;
                `}
              ></div>
              History
            </div>
            <div
              css={css`
                flex: 110px 0 0;
                background: #e5e5ed;
                border-radius: 14px;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 18px;
              `}
            >
              <div
                css={css`
                  height: 100%;
                  flex: 36px 0 0;
                  margin-left: 4px;
                  background-image: url(${setting});
                  background-repeat: no-repeat;
                  background-position: center center;
                  background-size: 22px 22px;
                `}
              ></div>
              Setting
            </div>
            <Link
              css={css`
                flex: 110px 0 0;
                background: #e5e5ed;
                border-radius: 14px;
                cursor: pointer;
                display: flex;
                align-items: center;
                font-size: 18px;
              `}
              to="/bye"
            >
              <div
                css={css`
                  height: 100%;
                  flex: 36px 0 0;
                  margin-left: 4px;
                  background-image: url(${logout});
                  background-repeat: no-repeat;
                  background-position: center center;
                  background-size: 22px 22px;
                `}
              ></div>
              Logout
            </Link>
          </div>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            width: 100%;
          `}
        >
          {isAvailable && (
            <>
              <h1
                css={css`
                  flex: 30px;
                  margin: 44px 22px 0 22px;
                  font-size: 21px;
                `}
              >
                Buying
                <div
                  css={css`
                    width: 31px;
                    height: 22px;
                    background-color: #da7060;
                    color: #fff;
                    font-size: 15px;
                    display: inline-block;
                    margin-left: 6px;
                    border-radius: 100px;
                    vertical-align: middle;
                    text-align: center;
                    line-height: 22px;
                  `}
                >
                  {isAvailable}
                </div>
              </h1>
              <ul>
                {biddingList.map((item: BiddingItem, index: number) => (
                  <li key={index}>
                    {item.tradeId}
                    {item.biddingPrice}
                    {item.biddingDate}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
