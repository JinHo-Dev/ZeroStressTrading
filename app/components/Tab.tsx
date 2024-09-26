import { css } from "@emotion/react";
import tab_home_high from "/tab_home_high.svg";
import tab_home from "/tab_home.svg";
import { useRecoilState } from "recoil";
import currentTabState from "~/atoms/currentTabState";
import { useNavigate } from "@remix-run/react";
import historyStackState from "~/atoms/historyStackState";

type Props = {
  name?: string;
  to?: string;
};

export default function Tab({ name, to }: Props) {
  const [historyStack, setHistoryStack] = useRecoilState(historyStackState);
  const navigate = useNavigate();
  let highlight = false;

  const [currentTab, setCurrentTab] = useRecoilState(currentTabState);
  if (currentTab === name) {
    highlight = true;
  }

  const goTab = () => {
    setHistoryStack(0);
    setCurrentTab(name || "");
    navigate(to || "", { replace: true });
  };

  let icon;
  switch (name) {
    case "Home":
      icon = highlight ? tab_home_high : tab_home;
      break;
    default:
      icon = highlight ? tab_home_high : tab_home;
  }
  return (
    <>
      <div
        onClick={goTab}
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        `}
      >
        <img src={icon} width={24} height={24} />
        <div
          css={css`
            flex: 20px 0 0;
            font-size: 10px;
            color: ${highlight ? "#8638ea" : "#212121"};
            font-weight: bold;
          `}
        >
          {name}
        </div>
      </div>
    </>
  );
}
