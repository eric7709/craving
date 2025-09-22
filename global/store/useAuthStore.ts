import { TAuthStore } from "@/modules/Employees/types/employee";
import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { getEmployeeByEmail } from "@/app/actions/employeeActions";

export const useAuthStore = create<TAuthStore>((set) => ({
  user: null,
  loading: true,
  login: (user) => set({ user }),
  logout: async () => {
    await supabase.auth.signOut();
    set({ user: null });
  },
  fetchUser: async () => {
    set({ loading: true });
    const { data: authData, error: authError } = await supabase.auth.getUser();
    if (authError || !authData.user) {
      set({ user: null, loading: false });
      return;
    }
    const email = authData.user.email;
    if (!email) {
      set({ user: null, loading: false });
      return;
    }
    const user = await getEmployeeByEmail(email)
    if (!user) {
      set({ user: null, loading: false });
      return;
    }
    set({ user, loading: false });
  },
}));
