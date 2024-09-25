import { atom } from "recoil";

const backButtonState = atom({
  key: "backButtonState",
  default: false,
});

export default backButtonState;
