import { atom } from "recoil";

const currentTabState = atom({
  key: "currentTabState",
  default: "Home",
});

export default currentTabState;
