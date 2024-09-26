import { css, keyframes } from "@emotion/react";
import { Prisma } from "@prisma/client";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { Form, json } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { fileURLToPath } from "url";
import historyStackState from "~/atoms/historyStackState";
import NavigationBar from "~/components/NavigationBar";
import { db } from "~/db.server";
import { authenticator } from "~/services/auth.server";
import { EffectCoverflow, EffectCube, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import RevealPhoto from "~/components/RevealPhoto";
import RevealName from "~/components/RevealName";
import revealStepState from "~/atoms/revealStepState";

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
  const swiper = useRef<SwiperRef>(null);
  const [revealStep, setRevealStep] = useRecoilState(revealStepState);
  useEffect(() => {
    setRevealStep(1);
  }, []);

  const [historyStack, setHistoryStack] = useRecoilState(historyStackState);
  useEffect(() => {
    setHistoryStack(historyStack + 1);
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
        modules={[Pagination, EffectCube]}
        effect={"cube"}
        centeredSlides={true}
        spaceBetween={0}
        slidesPerView={1}
        allowSlideNext={false}
        allowSlidePrev={false}
        cubeEffect={{
          shadow: false,
          slideShadows: true,
        }}
        pagination={{ clickable: false }}
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
          <RevealPhoto step={1} />
        </SwiperSlide>
        <SwiperSlide>
          <RevealPhoto step={2} />
        </SwiperSlide>
        <SwiperSlide>
          <RevealPhoto step={3} />
        </SwiperSlide>
        <SwiperSlide>
          <RevealName />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
