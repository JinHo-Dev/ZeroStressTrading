import { atom } from "recoil";

const menuOpenState = atom({
  key: "menuOpenState",
  default: false,
});

export default menuOpenState;
