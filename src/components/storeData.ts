import { create } from "zustand";

type VotingState = {
  address: string;
};

export const useStore = create<VotingState>((set) => ({
  address: "",
}));
