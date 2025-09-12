"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { CookieOptions } from "@supabase/ssr";

export async function login(formData: FormData): Promise<{ error?: string; redirect: string }> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string): string | undefined {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions): void {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions): void {
          cookieStore.delete({ name, ...options });
        },
      },
    }
  );

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message, redirect: "/login" };
  }

  return { redirect: "/" };
}