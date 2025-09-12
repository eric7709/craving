import { create } from "zustand";

type UIStore = {
  sidebarOpened: boolean;
  closeSideBar: () => void;
  toggleSidebar: () => void;
  openSideBar: () => void;
};
export const useUIStore = create<UIStore>((set, get) => ({
  closeSideBar: () =>
    set({
      sidebarOpened: false,
    }),
  sidebarOpened: false,
  openSideBar: () =>
    set({
      sidebarOpened: true,
    }),
  toggleSidebar: () => {
    const { sidebarOpened } = get();
    set({
      sidebarOpened: !sidebarOpened,
    });
  },
}));
