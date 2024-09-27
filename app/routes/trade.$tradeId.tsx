import { css, keyframes } from "@emotion/react";
import { Prisma } from "@prisma/client";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  Form,
  json,
  redirect,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { EffectCube, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import historyStackState from "~/atoms/historyStackState";
import LabeledInput from "~/components/LabeledInput";
import ShowPhoto from "~/components/ShowPhoto";
import ShowQna from "~/components/ShowQna";
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

  const navigate = useNavigate();

  const [historyStack, setHistoryStack] = useRecoilState(historyStackState);
  const [endTime, setEndTime] = useState(Number(new Date()) + 11000000);
  const [currentTime, setCurrentTime] = useState(Number(new Date()));
  const [isOpenBiddingModal, setIsOpenBiddingModal] = useState<boolean | null>(
    null,
  );

  useEffect(() => {
    setHistoryStack(historyStack + 1);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(currentTime + 1000);
    }, 1000);
  }, [currentTime]);

  const isAvailable = tradeItem && tradeItem.tradeId;

  if (!isAvailable) {
    return (
      <>
        <h1>No Item Available</h1>
      </>
    );
  }

  const blurring_in = keyframes`
    from {
      backdrop-filter: blur(0);
    }

    to {
      backdrop-filter: blur(8px);
    }
  `;

  const flying_in = keyframes`
    from {
      transform: translate3d(0, 230px, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
    }
  `;

  const blurring_out = keyframes`
    to {
      display: none;
      backdrop-filter: blur(0);
    }

    from {
      display: block;
      backdrop-filter: blur(8px);
    }
  `;

  const flying_out = keyframes`
    to {
      display: none;
      transform: translate3d(0, 230px, 0);
    }

    from {
      display: block;
      transform: translate3d(0, 0, 0);
    }
  `;

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        `}
      >
        <div
          css={css`
            flex: 60px 0 0;
            display: flex;
            cursor: default;
          `}
        >
          <div
            css={css`
              flex: 1;
              line-height: 46px;
              padding-left: 20px;
              font-size: 26px;
              font-weight: bold;
            `}
          >
            {tradeItem.tradeName}
          </div>
          <div
            css={css`
              flex: 140px 0 0;
              text-align: right;
              padding-right: 20px;
            `}
          >
            <div
              css={css`
                font-size: 18px;
                font-weight: bold;
                line-height: 44px;
              `}
            >
              {tradeItem.currentPrice?.toLocaleString()}원
            </div>
            <div
              css={css`
                font-size: 14px;
                color: rgba(0, 0, 20, 0.6);
                line-height: 4px;
              `}
            >
              {endTime - currentTime >= 3600000
                ? `${Math.floor((endTime - currentTime) / 3600000)}시간 `
                : ""}
              {endTime - currentTime >= 60000
                ? `${Math.floor(((endTime - currentTime) % 3600000) / 60000)}분 `
                : ""}{" "}
              {endTime - currentTime >= 0
                ? `${Math.floor(((endTime - currentTime) % 60000) / 1000)}초`
                : "마감"}
            </div>
          </div>
        </div>
        <div
          css={css`
            flex: 1;
            margin: 10px 0 0 0;
          `}
        >
          <Swiper
            modules={[Pagination, EffectCube, Mousewheel, Autoplay]}
            effect={"cube"}
            centeredSlides={true}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 10000000000 }}
            allowSlideNext={true}
            allowSlidePrev={true}
            mousewheel={{ enabled: true }}
            loop={true}
            cubeEffect={{
              shadow: false,
              slideShadows: true,
            }}
            grabCursor={true}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => {}}
            onSlideChange={() => {}}
            css={css`
              position: relative;
              width: 100%;
              height: 100%;
              overflow: hidden !important;
            `}
          >
            <SwiperSlide>
              <ShowQna
                question={`
                  제품에 고장이 있나요?
                `}
                answer={`
                  홈버튼이 작동하지 않는 제품입니다. 
                `}
              />
            </SwiperSlide>
            <SwiperSlide>
              <ShowQna
                question={`
                  유리나 본체 등 외관에 손상이 있나요?
                `}
                answer={`
                  경미한 생활 기스가 있습니다.
                `}
              />
            </SwiperSlide>
            <SwiperSlide>
              <ShowPhoto />
            </SwiperSlide>
            <SwiperSlide>
              <ShowPhoto />
            </SwiperSlide>
            <SwiperSlide>
              <ShowPhoto />
            </SwiperSlide>
          </Swiper>
        </div>
        {tradeItem.sellerId !== user && (
          <div
            css={css`
              flex: 80px 0 0;
              margin: 20px 0 0 0;
            `}
          >
            <button
              onClick={() => {
                if (!user) {
                  navigate({
                    pathname: "/hello",
                    search: `?backto=trade/${tradeItem.tradeId}`,
                  });
                } else {
                  setIsOpenBiddingModal(true);
                }
              }}
              css={css`
                background: #8638ea;
                bottom: 10px;
                margin: 0 20px;
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
          </div>
        )}
      </div>
      {user && tradeItem.sellerId !== user && (
        <div
          onClick={(e) => {
            if (e.currentTarget === e.target) {
              setIsOpenBiddingModal(false);
            }
          }}
          css={css`
            display: ${isOpenBiddingModal === null ? "none" : "default"};
            overflow: hidden;
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            animation: ${isOpenBiddingModal ? blurring_in : blurring_out} 0.15s
              ease-out;
            animation-fill-mode: forwards;
          `}
        >
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
              animation: ${isOpenBiddingModal ? flying_in : flying_out} 0.15s
                ease-out;
              animation-fill-mode: forwards;
            `}
          >
            <Form
              method="post"
              css={css`
                padding-top: 0px;
              `}
            >
              <input type="hidden" name="tradeId" value={tradeItem.tradeId} />
              <div
                css={css`
                  width: 100%;
                  height: 60px;
                  line-height: 40px;
                  padding: 10px 20px;
                  text-align: right;
                  font-size: 16px;
                  font-weight: bold;
                  color: rgba(0, 0, 20, 0.6);
                `}
              >
                현 최고가 {tradeItem.currentPrice?.toLocaleString()}원
              </div>
              <LabeledInput
                type="number"
                name="biddingPrice"
                autoComplete="no"
                placeholder="입찰 제시 가격"
              />
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
        </div>
      )}
    </div>
  );
}
