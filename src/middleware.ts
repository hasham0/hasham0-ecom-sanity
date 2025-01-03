import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { Roles } from "./types";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/cart",
  "/",
]);

const isAdminRoute = createRouteMatcher(["/studio(.*)", "/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { nextUrl } = request;
  const isApiAuthRoute = nextUrl.pathname.startsWith("/api");

  if (isApiAuthRoute) return;

  const { sessionClaims, redirectToSignIn } = await auth();
  if (isAdminRoute(request) && sessionClaims?.metadata.role !== Roles.ADMIN) {
    return redirectToSignIn();
  }

  if (isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
