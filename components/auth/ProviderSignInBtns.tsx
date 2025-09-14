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
        className="w-full flex items-center gap-2 rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base"
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
        className="w-full flex items-center gap-2 rounded-[1.9rem] border text-sm h-12 sm:h-10 sm:text-base"
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
