import { atom } from "recoil";

const currentTabState = atom({
  key: "currentTabState",
  default: "",
});

export default currentTabState;
