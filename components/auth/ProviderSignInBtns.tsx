import Image from "next/image"
import { ProviderSignInBtn } from "./ProviderSignInBtn"
import { useTranslations } from "next-intl"

export const ProviderSignInBtns = ({
  SignInCard,
  disabled,
  onLoading,
}: {
  SignInCard?: boolean
  disabled?: boolean
  onLoading: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const t = useTranslations("Auth")

  return (
    <div className="flex flex-col gap-2">
      <ProviderSignInBtn
        onLoading={onLoading}
        providerName="google"
        disabled={disabled}
        className="w-full flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-white/5 bg-transparent dark:hover:bg-zinc-900/50 text-sm h-11 sm:text-base transition-colors"
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        {SignInCard ? t("SIGN_IN.PROVIDERS.GOOGLE") : t("SIGN_UP.PROVIDERS.GOOGLE")}
      </ProviderSignInBtn>

      <ProviderSignInBtn
        onLoading={onLoading}
        disabled={disabled}
        providerName="github"
        className="w-full flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-white/5 bg-transparent dark:hover:bg-zinc-900/50 text-sm h-11 sm:text-base transition-colors"
      >
        <Image
          src="/github.png"
          alt="GitHub"
          width={20}
          height={20}
        />
        {SignInCard ? t("SIGN_IN.PROVIDERS.GITHUB") : t("SIGN_UP.PROVIDERS.GITHUB")}
      </ProviderSignInBtn>
    </div>
  )
}
