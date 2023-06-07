import { create } from "zustand";

export interface StoreState {
  showMenu: boolean
  introFinished: boolean
  setShowMenu: (showMenu: boolean) => void
  setIntroFinished: (introFinished: boolean) => void
}

const useStore = create<StoreState>((set) => ({
  showMenu: true,
  introFinished: false,
  setShowMenu: (showMenu: boolean) =>
    set((state) => ({
      showMenu
    })
    ),
  setIntroFinished: (introFinished: boolean) =>
    set((state) => ({
      introFinished
    })
    ),
}));

export default useStore;
