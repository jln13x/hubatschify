import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/").pop();

  // Get slug from backend by fetching because prisma cant run on the edge
  const response = await fetch(
    `${req.nextUrl.origin}/api/url-by-slug?slug=${slug}`
  );

  if (!response.ok) return NextResponse.redirect(req.nextUrl.origin);

  const data = await response.json();

  if (data?.url) {
    return NextResponse.redirect(data.url);
  }
}

export const config = {
  matcher: ["/h/:path*"],
};
