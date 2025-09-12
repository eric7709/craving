import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Present' : 'Missing',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing',
    urlFirst10: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 10)
  })
}