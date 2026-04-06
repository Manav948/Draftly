import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { AuthProvider } from "@/providers/AuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/providers/QueryProvider";
import ClientThemeProvider from "@/components/ui/ClientThemeProvider";
import { SaveTaskStateProvider } from "@/context/TaskSavingContext";

const locales = ["en", "hi"];

export const metadata: Metadata = {
  title: "Draftly",
  description: "Draftly is a modern workspace for managing tasks, mind maps, and focused workflows — designed to help teams and individuals plan, track, and execute ideas efficiently.",
  icons : {
    icon : "/logo2.png"
  }
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) notFound();

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <SaveTaskStateProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <AuthProvider>
          <QueryProvider>
            <ClientThemeProvider>
              <Toaster position="top-center" reverseOrder={false} />
              {children}
            </ClientThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </NextIntlClientProvider>
    </SaveTaskStateProvider>
  );
}
