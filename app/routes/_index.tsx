import { css } from "@emotion/react";
import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { Autoplay, EffectCube, Mousewheel, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import historyStackState from "~/atoms/historyStackState";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import NavigationBar from "~/components/NavigationBar";
import currentTabState from "~/atoms/currentTabState";

export const meta: MetaFunction = () => {
  return [
    { title: "Re:store" },
    {
      name: "Re:store",
      content: "Re:store Redefines the store",
    },
  ];
};

export default function Index() {
  const [historyStack, setHistoryStack] = useRecoilState(historyStackState);
  const [currentTab, setCurrentTab] = useRecoilState(currentTabState);
  useEffect(() => {
    setHistoryStack(historyStack + 1);
    setCurrentTab("Home");
  }, []);

  return (
    <>
      <NavigationBar>
        Re
        <span
          css={css`
            color: #7c3de1;
            margin: 0 2px;
            font-weight: 800;
          `}
        >
          :
        </span>
        store
      </NavigationBar>
      <Swiper
        modules={[Pagination, EffectCube, Autoplay]}
        effect={"cube"}
        centeredSlides={true}
        spaceBetween={0}
        loop={true}
        slidesPerView={1}
        autoplay={{ delay: 2500 }}
        allowSlideNext={true}
        allowSlidePrev={true}
        cubeEffect={{
          shadow: false,
          slideShadows: false,
        }}
        pagination={{ clickable: false }}
        onSwiper={(swiper) => {}}
        onSlideChange={() => {}}
        css={css`
          position: sticky;
          width: 100%;
          height: 240px;
          overflow: hidden !important;
        `}
      >
        <SwiperSlide>
          <div
            css={css`
              background: #e5e5ed;
              width: 100%;
              height: 100%;
            `}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            css={css`
              background: #e5e5ed;
              width: 100%;
              height: 100%;
            `}
          ></div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            css={css`
              background: #e5e5ed;
              width: 100%;
              height: 100%;
            `}
          ></div>
        </SwiperSlide>
      </Swiper>
      <ul>
        <Link to={`/`}>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
          <li>Event</li>
        </Link>
      </ul>
    </>
  );
}
