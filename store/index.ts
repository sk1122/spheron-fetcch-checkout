import { create } from "zustand";

interface IDetailStore {
  requestAddress: string;
  amount: string;
  setRequestAddress: (requestAddress: string) => void
  setAmount: (amount: string) => void
}

const useDetailStore = create<IDetailStore>((set) => ({
  requestAddress: "",
  amount: "",
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
}));

export default useDetailStore;