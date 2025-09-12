"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const cookieStore = await cookies(); // no await

  const supabase = createServerClient(
    "https://ipbjywutwrfmuvgybjbq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlwYmp5d3V0d3JmbXV2Z3liamJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MjkyODcsImV4cCI6MjA2NjEwNTI4N30.CtIEb776-njQbFKugMravxmigB9cg6cElOoJUsIPWGw",
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, options);
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, "", { ...options, maxAge: 0 });
        },
      },
    }
  );

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message, redirect: "/login" };
  }

  return { redirect: "/" };
}
