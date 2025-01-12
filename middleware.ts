import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Array of public routes that don't require authentication
  publicRoutes: [
    "/",
    "/api/webhooks(.*)",
    "/api/uploadthing(.*)",
    "/:username",
    "/search",
  ],
  // Array of routes to be ignored by the authentication middleware
  ignoredRoutes: ["/api/webhooks(.*)", "/api/uploadthing(.*)"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
