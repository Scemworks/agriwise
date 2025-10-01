import { NextResponse } from "next/server";
import { clearAuthCookies, parseCookieHeader } from "../../../../lib/cookies";
import { withCors } from "../../../../lib/cors";
import prisma from "../../../../lib/db";

async function handler(req: Request) {
  try {
    const cookies = parseCookieHeader(req.headers.get("cookie"));
    const refresh = cookies.refresh;
    if (refresh) {
      // find token and revoke
      const tokens = await prisma.refreshToken.findMany({
        where: { revoked: false },
      });
      for (const t of tokens) {
        // compare hash
        const ok = await import("bcryptjs").then((m) =>
          m.compare(refresh, t.tokenHash),
        );
        if (ok) {
          await prisma.refreshToken.update({
            where: { id: t.id },
            data: { revoked: true },
          });
        }
      }
    }
    const res = NextResponse.json({ ok: true });
    const [c1, c2] = clearAuthCookies();
    res.headers.append("Set-Cookie", c1);
    res.headers.append("Set-Cookie", c2);
    return res;
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 },
    );
  }
}

export const POST = withCors(handler);
