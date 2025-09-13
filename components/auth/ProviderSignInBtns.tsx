import { useTranslations } from "next-intl";;
import { boolean } from "zod";
import { ProviderSignInBtn } from "./ProviderSignInBtn";

export const ProviderSignInBtns = ({
    SignInCard,
}: {
    SignInCard?: boolean;

}) => {
    const t = useTranslations("Auth")
    return (
        <div className="flex flex-col gap-2">
            <ProviderSignInBtn
                className="w-full rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base"
            >
                {SignInCard ? t("SIGN_IN.PROVIDERS.GOOGLE") : t("SIGN_UP.PROVIDERS.GOOGLE")}
            </ProviderSignInBtn>

            {/* <ProviderSignInBtn className="w-full  bg-black/90 text-white dark:bg-black/70 hover:bg-black/80 dark:hover:bg-black/50 rounded-[1.9rem] border">
                {SignInCard ? t("SIGN_IN.PROVIDERS.APPALE") : t("SIGN_UP.PROVIDERS.APPALE")}
            </ProviderSignInBtn> */}

            <ProviderSignInBtn className="w-full rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base">
                {SignInCard ? t("SIGN_IN.PROVIDERS.GITHUB") : t("SIGN_UP.PROVIDERS.GITHUB")}
            </ProviderSignInBtn>
        </div>
    )
}