import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { NextResponse } from "next/server";

type AuthenticatedSession = NonNullable<Awaited<ReturnType<typeof getServerSession>>>;

type ApiHandler = (
  req: Request,
  ctx: { session: AuthenticatedSession }
) => Promise<NextResponse>;

/**
 * Wraps an API route handler with:
 *  1. Auth check (returns 401 if no session)
 *  2. Request timing (logs slow requests > 1s)
 *  3. Server-Timing header (visible in browser DevTools)
 *  4. Consistent error handling
 *
 * Usage:
 *   export const POST = withAuth(async (req, { session }) => {
 *     // session.user.id is guaranteed to exist
 *     return NextResponse.json({ ok: true });
 *   });
 */
export function withAuth(handler: ApiHandler) {
  return async (req: Request) => {
    const start = performance.now();
    const route = new URL(req.url).pathname;

    try {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }

      const response = await handler(req, { session });

      const duration = Math.round(performance.now() - start);

      // Log slow requests to help identify bottlenecks
      if (duration > 1000) {
        console.warn(
          `[SLOW] ${req.method} ${route} — ${duration}ms — user:${session.user.id}`
        );
      }

      // Server-Timing header: visible in Chrome DevTools Network tab
      response.headers.set("Server-Timing", `total;dur=${duration}`);
      return response;
    } catch (error) {
      const duration = Math.round(performance.now() - start);
      console.error(`[ERROR] ${req.method} ${route} — ${duration}ms`, error);
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
  };
}
