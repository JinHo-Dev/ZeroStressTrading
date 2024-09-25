import { atom } from "recoil";

const revealStepState = atom({
  key: "revealStepState",
  default: 1,
});

export default revealStepState;
