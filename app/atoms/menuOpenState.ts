import { atom } from "recoil";

const menuOpenState = atom<boolean | null>({
  key: "menuOpenState",
  default: null,
});

export default menuOpenState;
