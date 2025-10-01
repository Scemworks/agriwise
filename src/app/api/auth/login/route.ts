import { NextResponse } from "next/server";
import {
  createRefreshToken,
  signToken,
  verifyCredentials,
} from "../../../../lib/auth";
import { createAuthCookie, createRefreshCookie } from "../../../../lib/cookies";
import { withCors } from "../../../../lib/cors";
import { withErrorHandling } from "../../../../lib/errors";
import { logAuth } from "../../../../lib/logger";
import {
  applySecurityHeaders,
  getClientIP,
  rateLimit,
} from "../../../../lib/security";

async function handler(req: Request) {
  try {
    // Apply rate limiting - 5 login attempts per 15 minutes per IP
    const clientIP = getClientIP(req);
    const rateLimitResult = rateLimit(`login:${clientIP}`, 5, 15 * 60 * 1000);

    if (!rateLimitResult.success) {
      logAuth("Rate limit exceeded for login", undefined, { ip: clientIP });
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429, headers: { "Retry-After": "900" } },
      );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 },
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    logAuth("Login attempt", undefined, { email });

    const user = await verifyCredentials(email, password);

    if (!user) {
      logAuth("Failed login attempt", undefined, { email, ip: clientIP });
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    // Update last login time
    await import("../../../../lib/db").then(({ default: prisma }) =>
      prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      }),
    );

    const token = signToken({ sub: user.id, email: user.email });
    const refresh = await createRefreshToken(user.id);

    logAuth("Login successful", user.id, { email });

    const res = NextResponse.json({ user });
    applySecurityHeaders(res);
    res.headers.set("Set-Cookie", createAuthCookie(token));
    res.headers.append("Set-Cookie", createRefreshCookie(refresh.token));
    return res;
  } catch (err: unknown) {
    const error = err as Error;
    logAuth("Login error", undefined, { error: error.message });
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 },
    );
  }
}

export const POST = withCors(withErrorHandling(handler));
