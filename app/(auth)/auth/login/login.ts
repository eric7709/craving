"use server";

import { supabaseAdmin } from "@/global/lib/supabaseAdmin";

export async function login(
  formData: FormData
): Promise<{ error?: string; redirect: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { error } = await supabaseAdmin.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message, redirect: "/login" };
  }

  return { redirect: "/" };
}
