"use server";

import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseAdmin() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
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
}