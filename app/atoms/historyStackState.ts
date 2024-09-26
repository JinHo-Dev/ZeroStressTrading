import { atom } from "recoil";

const historyStackState = atom({
  key: "historyStackState",
  default: 0,
});

export default historyStackState;
