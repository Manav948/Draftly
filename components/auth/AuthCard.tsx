"use client";

import Image from "next/image";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useTranslations } from "next-intl";
import Link from "next/link";
import SignUpCardContent from "./SignUpCardContent";
import SignInCardContent from "./SignInCardContent";

interface Props {
  SignInCard?: boolean;
}

export const AuthCard = ({ SignInCard }: Props) => {
  const t = useTranslations("Auth");

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="w-full shadow-sm rounded-2xl p-4 bg-white dark:bg-[#111] border border-gray-200/80 dark:border-[#1f1f1f]">
        <CardHeader className="flex flex-col items-center text-center space-y-2">
          <Image
            className="rounded-full object-cover shadow-sm ring-1 ring-black/5 dark:ring-white/10"
            alt="Auth logo"
            width={56}
            height={56}
            src={"https://github.com/shadcn.png"}
          />
          <CardTitle className="text-xl font-bold">
            {SignInCard ? t("SIGN_IN.TITLE") : t("SIGN_UP.TITLE")}
          </CardTitle>
          <CardDescription className="text-md text-muted-foreground">
            {SignInCard ? t("SIGN_IN.DESC") : t("SIGN_UP.DESC")}
          </CardDescription>
        </CardHeader>

        {/* Auth form content */}
        <div className="px-4 pb-6">
          {SignInCard ? <SignInCardContent /> : <SignUpCardContent />}
        </div>
      </Card>

      {/* Footer link */}
      <p className="text-sm text-center mt-4 text-muted-foreground">
        {SignInCard
          ? t("SIGN_IN.DON'T_HAVE_ACCOUNT.FIRST")
          : t("SIGN_UP.HAVE_ACCOUNT.FIRST")}{" "}
        <Link
          className="text-red-500 font-medium hover:text-red-400 hover:underline transition-colors"
          href={SignInCard ? "/sign-up" : "/sign-in"}
        >
          {SignInCard
            ? t("SIGN_IN.DON'T_HAVE_ACCOUNT.SECOND")
            : t("SIGN_UP.HAVE_ACCOUNT.SECOND")}
        </Link>
      </p>
    </div>
  );
};
