import { create } from "zustand";
import type { ScrollInfo } from "dato-nextjs-utils/hooks/useScrollInfo";

export interface StoreState {
  showMenu: boolean
  introFinished: boolean
  scrollInfo: ScrollInfo | any
  hidePageHeader: boolean
  setShowMenu: (showMenu: boolean) => void
  setIntroFinished: (introFinished: boolean) => void
  setScrollInfo: (scrollInfo: ScrollInfo) => void
}

const useStore = create<StoreState>((set) => ({
  showMenu: false,
  introFinished: false,
  scrollInfo: {},
  hidePageHeader: false,
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
  setScrollInfo: (scrollInfo: ScrollInfo) =>
    set((state) => ({
      scrollInfo,
      hidePageHeader: scrollInfo.scrolledPosition > 30
    })
    ),
}));

export default useStore;
