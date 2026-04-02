import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  /* Match all paths except Next.js internals, Vercel internals,
     and static files (anything with a dot extension like .ico, .png).
     Required for localePrefix:"as-needed" so the middleware can detect
     and serve the default locale (ru) at "/" without a redirect. */
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/"],
};
