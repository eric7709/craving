import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string): string | undefined {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions): void {
          res.cookies.set(name, value, options);
        },
        remove(name: string, options: CookieOptions): void {
          res.cookies.delete({ name, ...options });
        },
      },
    }
  );
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  const { data: employee, error: employeeError } = await supabase
    .from("employees")
    .select("role")
    .eq("email", user.email)
    .single();
  if (employeeError || !employee) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  const role = employee.role?.toLowerCase() || "";
  const path = req.nextUrl.pathname;
  // Role-based access control
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (path.startsWith("/cashier") && !["admin", "cashier"].includes(role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  if (path.startsWith("/waiter") && !["admin", "waiter"].includes(role)) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }
  return res;
}
export const config = {
  matcher: ["/admin/:path*", "/cashier/:path*", "/waiter/:path*"],
};