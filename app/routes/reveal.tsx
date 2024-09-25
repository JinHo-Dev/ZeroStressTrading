import { css, keyframes } from "@emotion/react";
import { Prisma } from "@prisma/client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { Swiper, SwiperSlide } from "swiper/react";
import { fileURLToPath } from "url";
import backButtonState from "~/atoms/backButtonState";
import NavigationBar from "~/components/NavigationBar";
import { db } from "~/db.server";
import { authenticator } from "~/services/auth.server";
import "swiper/css";

export async function loader({ request }: LoaderFunctionArgs) {
  if (!(await authenticator.isAuthenticated(request))) {
    return redirect("../hello");
  }
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();
  let data: Prisma.tradesCreateInput;

  if (request.method === "POST") {
    data = {
      tradeName: body.get("tradeName") as string,
      tradeId: body.get("tradeName") as string,
      createDate: new Date(),
      sellerId: await authenticator.isAuthenticated(request),
    };

    // 트레이드 이름 규칙 화이트리스트
    data.tradeName = data.tradeName?.replaceAll(
      /[^0-9a-zA-Zㄱ-ㅎ가-힣 ()~#\^+*,._\-]/gi,
      "",
    );

    // tradeId 띄어쓰기 제거
    data.tradeId = (data.tradeName as string).replaceAll(/ /gi, "-");

    // 중복된 tradeName인 경우, tradeId 뒤에 구분 index 부여
    const tradeItem = await db.trades.findFirst({
      orderBy: [
        {
          createDate: "desc",
        },
      ],
      where: {
        tradeName: data.tradeName,
      },
    });

    if (tradeItem) {
      if (tradeItem.tradeId === data.tradeId) {
        data.tradeId += `@2`;
      } else {
        const lastIndexArray = tradeItem.tradeId.match(/(?<=@)\d+$/gi);
        if (lastIndexArray) {
          data.tradeId = `${data.tradeId}@${Number(lastIndexArray[0]) + 1}`;
        }
      }
    }

    await db.trades.create({
      data: data,
    });
    const createdTradeUrl = encodeURI(`/trade/${data.tradeId as string}`);
    return redirect(createdTradeUrl);
  }
}

export default function Reveal() {
  const [isBackButton, setIsBackButton] = useRecoilState(backButtonState);

  useEffect(() => {
    setIsBackButton(false);
  }, []);

  const fileSelector = useRef<HTMLInputElement>(null);

  const bounce = keyframes`
    from, 20%, 53%, 80%, to {
      transform: translate3d(0,0,0);
    }

    40%, 43% {
      transform: translate3d(0, -30px, 0);
    }

    70% {
      transform: translate3d(0, -15px, 0);
    }

    90% {
      transform: translate3d(0,-4px,0);
    }
  `;

  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper>
      <Form
        method="post"
        css={css`
          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            position: relative;
            width: calc(100% - 40px);
            margin: 0 20px;
            background-color: rgba(0, 0, 20, 0.1);
            border-radius: 10px;
            height: 100%;
            overflow: hidden;
          `}
        >
          <input
            type="button"
            value="사진 추가"
            onClick={() => {
              fileSelector.current?.click();
            }}
            css={css`
              position: absolute;
              margin-left: -60px;
              left: 50%;
              margin-top: -30px;
              top: 50%;
              width: 120px;
              border: none;
              background-color: rgba(255, 255, 255, 0.4);
              height: 60px;
              border-radius: 16px;
              font-size: 15px;
              font-weight: bold;
              cursor: pointer;
            `}
          />
          <input
            type="file"
            ref={fileSelector}
            css={css`
              display: none;
            `}
          />
          <input
            type="button"
            value="다음"
            css={css`
              position: absolute;
              right: 20px;
              bottom: 20px;
              width: 80px;
              border: none;
              background-color: #8638ea;
              height: 80px;
              border-radius: 100%;
              font-size: 15px;
              font-weight: bold;
              color: #fff;
              cursor: pointer;
              animation: ${bounce} 1s ease infinite;
              &:hover {
                animation: none;
              }
            `}
          />
        </div>
        <ul>
          <li></li>
          <li>
            <input type="text" name="tradeName" placeholder="tradeName" />
          </li>
          <li>
            <input type="text" name="minPrice" placeholder="minPrice" />
          </li>
          <li>
            <input type="text" name="priceUnit" placeholder="priceUnit" />
          </li>
          <li>
            <input type="button" value="set Details" />
          </li>
          <li>
            <button type="submit">Create</button>
          </li>
        </ul>
      </Form>
    </>
  );
}
