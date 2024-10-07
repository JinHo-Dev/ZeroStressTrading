import { atom } from "recoil";

const revealImage64State = atom<string[]>({
  key: "revealImage64State",
  default: [],
});

export default revealImage64State;
