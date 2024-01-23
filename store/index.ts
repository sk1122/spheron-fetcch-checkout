import { create } from "zustand";

interface IDetailStore {
  requestAddress: string;
  amount: string;
  chain: string;
  token: string
  setRequestAddress: (requestAddress: string) => void
  setAmount: (amount: string) => void
  setChain: (chain: string) => void
  setToken: (token: string) => void
}

const useDetailStore = create<IDetailStore>((set) => ({
  requestAddress: "",
  amount: "",
  chain: "",
  token: "",
  setRequestAddress: (requestAddress) => {
    set({
      requestAddress: requestAddress,
    });
  },
  setAmount: (amount) => {
    set({
      amount: amount,
    });
  },
  setChain: (chain) => {
    set({
      chain: chain,
    });
  },
  setToken: (token) => {
    set({
      token: token,
    });
  },
}));

export default useDetailStore;