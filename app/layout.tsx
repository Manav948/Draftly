import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "SuperProductive",
  description: "A productivity app with tasks, mind maps, and more",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
