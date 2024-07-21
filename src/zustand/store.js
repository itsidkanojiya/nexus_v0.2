import { create } from "zustand";

const usePaperStore = create((set) => ({
    paper: {},
    setPaper: (paper) => set({ paper: paper }),
    reset: () => set({ paper: {} }),
}));

export { usePaperStore };
