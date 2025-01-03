import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Sanity Studio",
    template: "%s | Sanity Studio ",
  },
  description: "Control Headless CMS",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
