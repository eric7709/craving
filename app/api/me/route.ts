import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { CookieOptions } from "@supabase/ssr";

// Define response type
interface UserResponse {
  user: {
    id: string;
    email: string | undefined;
    name: string;
    role: string;
    profileID: string | undefined;
    userID: string | null;
  } | null;
}

export async function GET(): Promise<NextResponse<UserResponse>> {
  const cookieStore = await cookies();
  console.log("OK");
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

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("employees")
    .select("id,firstname, lastname, role, auth_user_id")
    .eq("auth_user_id", user.id)
    .single();

  return NextResponse.json({
    user: {
      id: user.id,
      profileID: profile?.id,
      email: user.email,
      name: profile?.firstname
        ? `${profile.firstname} ${profile.lastname}`
        : "Unknown User",
      role: profile?.role ?? "User",
      userID: profile?.auth_user_id ?? null,
    },
  });
}

export const runtime = "nodejs";
